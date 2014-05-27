App.UserEditController = Ember.ObjectController.extend({

    needs: ['memberships'],

    wwoofMemberships: function () {
        return this.get('controllers.memberships').filter(function (membership) {
            return membership.get('type') === 'W';
        })
    }.property('controllers.memberships.@each'),

    hostMemberships: function () {
        return this.get('controllers.memberships').filter(function (membership) {
            return membership.get('type') === 'H';
        })
    }.property('controllers.memberships.@each'),

    wwoofCannotRenewMembership: function () {
        return this.cannotRenewMembership(this.get('wwoofMemberships.firstObject.expireAt'));
    }.property('wwoofMemberships.@each'),

    hostCannotRenewMembership: function () {
        return this.cannotRenewMembership(this.get('hostMemberships.firstObject.expireAt'));
    }.property('hostMemberships.@each'),

    cannotRenewMembership: function (lastMembershipEnd) {
        var oneMonthBeforeLastMembershipEnds = lastMembershipEnd.setMonth(lastMembershipEnd.getMonth() - 1);
        return new Date() < oneMonthBeforeLastMembershipEnds;
    },

    actions: {
        saveUser: function () {

            var user = this.get('model');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Validate and save
            user.validate().then(function () {
                user.save()
                    .then(function () {
                        alertify.success('Information updated!');
                    }).catch(function () {
                        alertify.error('Something went wrong.');
                    });
            }).catch(function (error) {
                console.log(error);
                alertify.error("Your submission is invalid.");
            })
        }
    }
});