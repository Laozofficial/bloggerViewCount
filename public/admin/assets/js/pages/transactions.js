new Vue({
    el:'#app',
    data:{
        transactions:[],
        loading: true,
        content: false,
        page: 1,
        loading_transactions: false,
        account_details:{}
    },
    mounted() {
        this.getTransactions();
    },
    methods: {
        getTransactions(){
            this.loading_transactions = true;
            let url = '/admin/get/transactions?page=' + this.page;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.transactions = response.data.transactions;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                })
                .then(() => {
                    this.content = true;
                    this.loading = false;
                    this.loading_transactions = false;
                });
        },
        pageChange(page) {
            if (this.page != page && page != 0) {
                this.page = page;
                this.getTransactions();
            }
        },
        approve_withdrawal(id){
            let link = '/admin/get/account/details/'+id;

            axios.get(link)
                .then((response) => {
                    console.log(response);
                    this.account_details = response.data.account_details;
                    swal({
                        title: "Are you sure?",
                        text: "Before clicking OK, be sure that you sent the money to the client bank account ! ----"+ this.account_details.bank_name + ' '+ this.account_details.account_number,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            let url = '/admin/approve/withdrawal/' +id;
        
                            axios.get(url)
                                .then((response) => {
                                    console.log(response);
                                    swal(response.data.success, {
                                        icon: "success",
                                    });
                                    this.getTransactions();
                                })
                                .catch((error) => {
                                    console.log(error);
                                    toastr.error('something went wrong');
                                });
        
                       
                        } 
                      });
                })
                .catch((error)=>{
                    console.log(error);
                    toastr.error('something went wrong');
                });
        }
    },
})