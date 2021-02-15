new Vue({
    el: '#app',
    data: {
        loading: true,
        content: false,
        workshop: {},
    },
    mounted() {
        this.getWorkshop();
    },
    methods: {
        getWorkshop() {
            let url = '/admin/get/workshop/' + id;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.workshop = response.data.workshop;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                })
                .then(() => {
                    this.content = true;
                    this.loading = false;
                });
        },
        getPaymentDetails(id) {
            window.location.href = '/admin/fetch/earnings/' + id;
        },
        getFullEarnings(id) {
            window.location.href = '/admin/get/workshop/earnings/' + id;
        }
    },
});
