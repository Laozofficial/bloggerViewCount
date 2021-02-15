new Vue({
    el: '#app',
    data: {
        loading: true,
        content: false,
        bookings: [],
        page: 1,
        loading_bookings: false
    },
    mounted() {
        this.getBookings();
    },
    methods: {
        getBookings() {
            this.loading_bookings = true;
            let url = '/admin/get/all/bookings?=' + this.page;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.bookings = response.data.bookings;
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
                this.getBookings();
            }
        },
        moreDetails(id) {
            window.location.href = '/admin/get/single/booking/' + id;
        }
    },
});
