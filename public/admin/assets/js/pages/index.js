new Vue({
    el:'#app',
    data:{
        loading_bookings: false,
        loading: true,
        content: false,
        users:[],
        workshops:[],
        cars:[],
        bookings:[],
        page: 1,
    },
    mounted() {
        this.getDetails();
    },
    methods: {
        getDetails(){
            this.getUsers();
            this.getWorkshops();
            this.getCars();
            this.getBookings();
        },
        getUsers(){
            let url = '/admin/get/all/users?page=' + this.page;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.users = response.data.users;
                    this.loading = false;
                    this.content = true;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        getWorkshops(){
            let url = '/admin/get/workshops?page=' + this.page;
            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.workshops = response.data.workshops;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        getCars(){
            let url = '/admin/get/registered/cars';

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.cars =  response.data.cars;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
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
                })
                .then(() => {
                    this.loading_bookings = false;
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