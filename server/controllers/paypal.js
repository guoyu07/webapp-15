/**
 * PayPal controller.
 */
var paypal = require('paypal-rest-sdk');
var db = require('../models');

/**
 * Initiates a payment with PayPal.
 * TODO: translate properly the item description once i18n is set up.
 */
exports.start = function (req, res) {

    // Get base price
    var itemCode = req.query.itemCode;
    var basePrice = getBasePrice(itemCode);

    // Make sure base price was found
    if (!basePrice || basePrice <= 0) {
        res.send(500);
        return;
    }

    // Create a payment object
    var payment = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:3333/payment/execute",
            cancel_url: "http://localhost:3333/payment/cancel"
        },
        transactions: [
            {
                amount: {
                    total: basePrice,
                    currency: "EUR"
                },
                description: "My awesome payment"
            }
        ]
    };

    // Initiate the payment
    paypal.payment.create(payment, function (error, payment) {
        if (error) {
            console.log(error);
            res.send(500);
        } else {
            if (payment.payer.payment_method === 'paypal') {

                // Store payment info in session
                req.session.paymentId = payment.id;
                req.session.itemCode = itemCode;

                // Redirect to paypal
                var redirectUrl;
                for (var i = 0; i < payment.links.length; i++) {
                    var link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                res.redirect(redirectUrl);
            }
        }
    });
};

/**
 * Executes a payment (PayPal callback) then persists the membership in the database.
 * TODO: handle errors and add confirmation page in Ember.
 */
exports.execute = function (req, res) {

    // Retrieve the payment id from session and payer id query param
    var paymentId = req.session.paymentId;
    var payerId = req.param('PayerID');

    // Validate data
    if (!paymentId || !payerId) {
        res.send(500);
        return;
    }

    // Execute payment
    var details = { "payer_id": payerId };
    paypal.payment.execute(paymentId, details, function (error, payment) {

        if (error) {
            res.send(500);
            return;
        }

        // Find the membership with the most recent expiration date
        db.Membership.find({
            where: {
                userId: req.user.id,
                type: 'Wwoofer'
            },
            order: 'expireAt DESC'
        }).then(function (membership) {

            // Determine the new membership expiration date
            var startAt = membership ? membership.expireAt : new Date();
            var expireAt = startAt.setFullYear(startAt.getFullYear() + 1);

            // Persist the membership
            return db.Membership.create({
                type: 'Wwoofer',
                paymentId: payment.id,
                payerId: payment.payer.payer_info.payer_id,
                saleId: payment.transactions[0].related_resources[0].sale.id,
                userId: req.user.id,
                expireAt: expireAt,
                itemCode: req.session.itemCode,
                paymentType: 'PPL'
            });
        }).then(function (newMembership) {
            res.redirect('/app/payment/done');
        }, function (error) {
            res.send(500);
        })
    });
};

/**
 * Returns the base price of a membership based on the item code given in parameter.
 * @param {String} itemCode The itemCode.
 * @returns {Integer} The base price for the item or false if not found.
 */
var getBasePrice = function (itemCode) {
    switch (itemCode) {
        case "WO1":
            return 20;
        case "WO2":
            return 25;
        case "WOB1":
            return 30;
        case "WOB2":
            return 35;
        case "H":
            return 35;
        case "HR":
            return 30;
        default:
            return false;
    }
};