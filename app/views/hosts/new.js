/**
 * Ember view for host creation.
 */
import Ember from "ember";
import Notify from 'ember-notify';

export default Ember.View.extend({
    didInsertElement: function () {
        var self = this;

        debugger;

        Ember.$('#file_upload').fileupload({
            dataType: 'json',
            formData: {
                hostId: this.get('controller.model.id')
            },
            done: function () {
                Notify.success("File uploaded!");

                // Force a reload of the host so the photo get displayed in the list
                self.get('controller.model').reload();
                // self.get('controller.store').push('photo', data.result.photo);
            },
            error: function () {
                Notify.error("Unable tu upload files on the server.");
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
                        Notify.error(file.name + " is not a valid image.");
                        goUpload = false;
                    }
                    if (file.size > 5000000) { // 5mb
                        Notify.error(file.name + " is too large. Max size: 5 MB.");
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