import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

const MAX_SIZE = 1024 * 1024 * 5; // 5 mb

export default Ember.Component.extend({

  store: service('store'),
  notify: service('notify'),

  /**
   * Data-url where the photo will be posted
   */
  dataUrl: null,

  /**
   * Mode for this component: user or host
   */
  mode: null,

  /**
   * The model to save the photo to
   */
  model: null,

  /**
   * Return the correct form data depending on the mode
   */
  formData: computed('mode', 'model.id', function() {
    const mode = this.get('mode');
    if (mode === 'host') {
      return {
        hostId: this.get('model.id')
      };
    } else if (mode === 'user') {
      return {};
    }
  }),

  didInsertElement() {
    const self = this;

    Ember.$('#file_upload').fileupload({
      dataType: 'json',
      formData: this.get('formData'),
      add(e, data) {
        let goUpload = true;
        Ember.$.each(data.files, function(index, file) {
          if (!(/\.(jpg|jpeg)$/i).test(file.name)) {
            self.get('notify').error(self.get('i18n').t('notify.imageFormatError', { fileName: file.name }));
            goUpload = false;
          }
          if (file.size > MAX_SIZE) {
            self.get('notify').error(self.get('i18n').t('notify.imageSizeError', { fileName: file.name }));
            goUpload = false;
          }
        });
        if (goUpload === true) {
          Ember.$('.progress-bar').css('width', '0%');
          Ember.$('.progress-bar').html('0%');
          data.submit();
        }
      },
      progressall(e, data) {
        let progress = parseInt(data.loaded / data.total * 100, 10);
        progress = Math.min(progress, 80);
        Ember.$('.progress-bar').css('width', `${progress}%`);
        Ember.$('.progress-bar').html(`${progress}%`);
      },
      done(e, data) {
        Ember.$('.progress-bar').css('width', `100%`);
        Ember.$('.progress-bar').html(`100%`);

        let mode = self.get('mode');
        if (mode === 'host') {
          self.get('doneHost')(e, data, self);
        } else if (mode === 'user') {
          self.get('doneUser')(e, data, self);
        }
      },
      error() {
        self.get('notify').error({ html: self.get('i18n').t('notify.submissionError') });
      }
    });
  },

  /**
   * Callback when the request is successful in host mode.
   * @param e
   * @param data
   * @param self
   */
  doneHost(e, data, self) {
    self.get('notify').success(self.get('i18n').t('notify.fileUploaded'));

    // Push the created photo in the store, then add the photo in the host
    let normalizedPhoto = self.get('store').normalize('photo', data.result.photo);
    self.get('store').push(normalizedPhoto);
    self.get('model').reload();
  },

  /**
   * Callback when the request is successful in user mode.
   * @param e
   * @param data
   * @param self
   */
  doneUser(e, data, self) {
    self.get('notify').success(self.get('i18n').t('notify.fileUploaded'));

    // Set the created photo as user photo
    self.get('model').set('photo', data.result.photo);
  }
});
