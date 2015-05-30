import Ember from 'ember';

export default Ember.Component.extend({

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
    formData: function () {
        var mode = this.get('mode');
        if (mode == 'host') {
            return {
                hostId: this.get('model.id')
            };
        } else if (mode == 'user') {
            return {};
        }
    }.property('mode', 'model.id'),

    didInsertElement: function () {
        var self = this;

        Ember.$('#file_upload').fileupload({
            dataType: 'json',
            formData: this.get('formData'),
            done: function (e, data) {
                var mode = self.get('mode')
                if (mode == 'host')  {
                    self.get('doneHost')(e, data, self);
                } else if (mode == 'user') {
                    self.get('doneUser')(e, data, self);
                }
            },
            error: function () {
                alertify.error(Ember.I18n.t('notify.submissionError'));
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                Ember.$('.progress-bar').css('width', progress + '%');
                Ember.$('.progress-bar').html(progress + '%');
            },
            add: function (e, data) {
                var goUpload = true;
                Ember.$.each(data.files, function (index, file) {
                    if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name)) {
                        alertify.error(Ember.I18n.t('notify.imageFormatError', { fileName: file.name }));
                        goUpload = false;
                    }
                    if (file.size > 5000000) { // 5mb
                        alertify.error(Ember.I18n.t('notify.imageSizeError', { fileName: file.name }));
                        goUpload = false;
                    }
                });
                if (goUpload === true) {
                    Ember.$('.progress-bar').css('width', 0 + '%');
                    Ember.$('.progress-bar').html(0 + '%');
                    data.submit();
                }
            }
        });
    },

    /**
     * Callback when the request is sucessfull in host mode
     * @param e
     * @param data
     * @param self
     */
    doneHost: function (e, data, self) {
        alertify.success(Ember.I18n.t('notify.fileUploaded'));

        // Push the created photo in the store, then add the photo in the host
        var controller = self.get('controller');
        var photo = controller.get('store').push('photo', data.result.photo);
        self.get('model').get('photos').addObject(photo);
    },

    /**
     * Callback when the request is sucessfull in user mode
     * @param e
     * @param data
     * @param self
     */
    doneUser: function (e, data, self) {
        alertify.success(Ember.I18n.t('notify.fileUploaded'));

        // Set the created photo as user photo
        self.get('model').set('photo', data.result.photo);
    }
});
