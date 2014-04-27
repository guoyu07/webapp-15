/**
 * PayPal controller.
 */
var paypal = require('paypal-rest-sdk');
var db = require('../models');

/**
 * Initiates a payment with PayPal.
 * TODO: authenticate with Bearer in order to get the user id + add query params (purchase data, ...)
 */
exports.start = function (req, res) {

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
                    total: "5.00",
                    currency: "USD"
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

                // Store payment values in session
                // TODO: use user id from req.user when wired
                req.session.paymentId = payment.id;
                req.session.userId = 1;

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
 * Executes a payment (PayPal callback) then persists the renewal in the database.
 * TODO: handle errors and add confirmation page in Ember.
 */
exports.execute = function (req, res) {

    // Retrieve the payment id from session and payer id query param
    var paymentId = req.session.paymentId;
    var payerId = req.param('PayerID');

    // Validate data
    if (!paymentId || !payerId)
        res.send(500);

    // Execute payment
    var details = { "payer_id": payerId };
    paypal.payment.execute(paymentId, details, function (error, payment) {

        if (error) {
            console.log(error);
            res.send(500);
        } else {
            // Persist renewal
            db.Renewal.create({
                type: 'Wwoofer',
                paymentId: payment.id,
                payerId: payment.payer.payer_info.payer_id,
                saleId: payment.transactions[0].related_resources[0].sale.id,
                userId: req.session.userId,
                date: new Date()
            }).success(function (renewal) {
                res.redirect('/app/payment/done');
            }).error(function (error) {
                res.send(500);
            });
        }
    });
};