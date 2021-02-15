new Vue({
    el: '#app',
    data: {
        content: false,
        loading: true,
        payment: {}
    },
    mounted() {
        this.getPaymentDetails();
    },
    methods: {
        getPaymentDetails() {
            let url = '/admin/get/payment/' + id;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.payment = response.data.payment;
                    this.loading = false;
                    this.content = true;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        getFullEarnings(id) {
            window.location.href = '/admin/get/workshop/earnings/' + id;
        }
    },
})
