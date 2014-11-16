/**
 * Ember view for host creation.
 */
import Ember from "ember";

export default Ember.View.extend({
    didInsertElement: function () {
        var self = this;

        Ember.$('#file_upload').fileupload({
            dataType: 'json',
            formData: {
                hostId: this.get('controller.model.id')
            },
            done: function (e, data) {
                alertify.success(Ember.I18n.t('notify.fileUploaded'));

                // Push the created photo in the store, then add the photo in the host
                var controller = self.get('controller');
                var photo = controller.get('store').push('photo', data.result.photo);
                controller.get('model').get('photos').addObject(photo);
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
    }
});
