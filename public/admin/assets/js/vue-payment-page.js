var app = new Vue({
    el: "#app",
    data: {
        payments: {
            total: 0,
            data: [],
            per_page: 10,
        },
        payment: {
            trivia_id: null,
            user_id: null,
        },
        payment_errors: {
            trivia_id: null,
            user_id: null,
        },
        active_trivias: [],
        active_users: [],
        page: 1,
        loading_payments: false,
        loading_payment: false,
    },
    mounted() {
        this.getPayments();
        this.getActiveTrivias();
        this.getActiveUsers();
    },
    methods: {
        resetPaymentFormErrors: function () {
            this.payment_errors = {
                user_id: null,
                trivia_id: null,
            };
        },

        getPayments: function () {
            this.loading_payments = true;
            axios
                .get("/admin/payments?page=" + this.page)
                .then(({ data }) => {
                    this.payments = data;
                    this.page = data.current_page;
                })
                .catch(({ response: error }) => {
                    //console.error(error);
                    if (error.status == 500) this.getPayments();
                    errorNotify("An Error occured");
                })
                .then(() => {
                    this.loading_payments = false;
                });
        },

        getActiveTrivias: function () {
            axios
                .get("/admin/activated-trivias")
                .then(({ data }) => {
                    this.active_trivias = data;
                })
                .catch(({ response: error }) => {
                    if (error.status == 500) this.getActiveTrivias();
                    //console.error(error);
                    errorNotify("An Error occured Fetching Activated Trivias");
                });
        },

        getActiveUsers: function () {
            axios
                .get("/admin/active-users")
                .then(({ data }) => {
                    this.active_users = data;
                })
                .catch(({ response: error }) => {
                    //console.error(error);
                    if (error.status == 500) this.getActiveUsers();
                    errorNotify("An Error occured Fetching Active Users");
                });
        },

        resetPaymentData: function () {
            this.payment = {
                user_id: null,
                trivia_id: null,
            };
            $("#paymentModal").modal("toggle");
        },

        submitPaymentForm: function (e) {
            this.resetPaymentFormErrors();
            this.loading_payment = true;
            axios
                .post("/admin/payments", this.payment)
                .then(({ data }) => {
                    if (data.success) {
                        successNotify(data.success);
                        this.resetPaymentData();
                        this.getPayments();
                    }
                })
                .catch(({ response: error }) => {
                    if (error.status == 422) {
                        for (let i in error.data.errors) {
                            this.payment_errors[i] = error.data.errors[i][0];
                        }
                    } else if (error.status == 400) {
                        errorNotify(error.data.error);
                    }
                })
                .then(() => {
                    this.loading_payment = false;
                });
        },

        pageChange(page) {
            if (this.page != page && page != 0) {
                this.page = page;
                this.getPayments();
            }
            //console.log("changed to", page);
        },
    },
});
