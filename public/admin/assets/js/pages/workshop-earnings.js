new Vue({
    el: '#app',
    data: {
        loading: true,
        content: false,
        earnings: [],
        page: 1,
        loading_earnings: false
    },
    mounted() {
        this.getFullEarnings();
    },
    methods: {
        getFullEarnings() {
            let url = '/admin/fetch/all/workshop/earnings/' + id + '?page=' + this.page;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.earnings = response.data.payments;
                    this.content = true;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        pageChange(page) {
            if (this.page != page && page != 0) {
                this.page = page;
                this.getFullEarnings();
            }
        },
        getPaymentDetails(id) {
            window.location.href = '/admin/fetch/earnings/' + id;
        }
    },
})
