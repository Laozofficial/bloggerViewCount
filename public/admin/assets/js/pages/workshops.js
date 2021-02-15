new Vue({
    el: "#app",
    data: {
        loading: true,
        content: false,
        workshops: [],
        page: 1,
        loading_workshops: false
    },
    mounted() {
        this.getWorkshops();
    },
    methods: {
        getWorkshops() {
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
        pageChange(page) {
            if (this.page != page && page != 0) {
                this.page = page;
                this.getWorkshops();
            }
        },
        moreDetails(id) {
            window.location.href = '/admin/get/workshop/details/' + id;
        }
    },
});
