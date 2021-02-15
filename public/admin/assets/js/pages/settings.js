new Vue({
    el:'#app',
    data: {
        loading: true,
        content: false,
        percentage:''
    },
    mounted() {
        this.getPercentage();
    },
    methods: {
        add_setting(){
            $('#settings').modal('show');
        },
        submit(){
            if(this.percentage === ''){
                toastr.error('some fields are empty');
            }else{
                let url = '/admin/update/percentage';

                axios.post(url, {percentage: this.percentage})
                    .then((response) => {
                        console.log(response);
                        this.percentage = response.data.percentage;
                        this.content = true;
                        this.loading = false;
                        $('#settings').modal('hide');
                    })
                    .catch((error) => {
                        console.log(error);
                        toastr.error('something went wrong');
                    });
            }
        },
        getPercentage(){
            let url = '/admin/get/percentage';

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.percentage = response.data.percentage;
                        this.content = true;
                        this.loading = false;
                        $('#settings').modal('hide');
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        }
    },
})