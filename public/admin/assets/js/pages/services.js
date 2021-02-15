new Vue({
    el:'#app',
    data:{
        loading: true,
        content: false,
        button_name: 'create',
        update_button: false,
        service_types:[],
        service_type: {},
        services: [],
        service_update: {
            name: '',
            icon:''
        },
        store_service: {
            name: '',
            icon:''
        },
        service: {
            name:'',
            service_type_id: ''
        },
        update_service: {
            id: '',
            name: '',
            icon:''
        }
    },
    mounted(){
        this.getServiceTypes();
    },
    methods:{
        getServiceTypes(){
            let url = '/admin/get/service-types';

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.service_types = response.data.service_types;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                })
                .then(() => {
                    this.loading = false;
                    this.content = true;
                });
        },
        editServiceType(id){
            let url = '/admin/get/service-type/'+ id;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.service_type = response.data.service_type;
                    $('#updateServiceType').modal('show');
                    this.service_update.name = response.data.service_type.name;
                    this.service_update.icon = response.data.service_type.icon;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                })
        },
        updateServiceType(id){
            let url = '/admin/get/service-type/'+ id;

            axios.post(url, this.service_update)
                .then((response) => {
                    console.log(response);
                    toastr.success(response.data.success);
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                })
                .then(() => {
                    this.getServiceTypes();
                    $('#updateServiceType').modal('hide');
                });
        },
        storeServiceType(){
            $('#storeServiceType').modal('show');
        },
        createServiceType(){
            if(this.store_service.name === '' || this.store_service.icon === ''){
                toastr.error('some fields are empty');
            }else{
                let url = '/admin/store/service-type';

                axios.post(url, this.store_service)
                    .then((response) => {
                        console.log(response);
                        toastr.success(response.data.success)
                    })
                    .catch((error) => {
                        console.log(error);
                        toastr.error('something went wrong');
                    })
                    .then(() => {
                        this.getServiceTypes();
                        $('#storeServiceType').modal('hide');
                    })
            }
        },
        addService(id){
            this.service.service_type_id = id;
            $('#addService').modal('show');            
        },
        storeService(){
            if(this.service.name === ''){
                toastr.error('some fields are empty');
            }else{
                let url = '/admin/store/service/' +             this.service.service_type_id;

                axios.post(url, this.service)
                    .then((response) => {
                        console.log(response);
                        toastr.success(response.data.success);
                        this.service.name = '';
                        $('#addService').modal('hide');
                    })
                    .catch((error) => {
                        console.log(error);
                        toastr.error('something went wrong');
                    });
            }
        },
        getServices(id){
            let url = '/admin/get/services/'+id;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.services = response.data.services;
                    $('#service').modal('show');
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                })
        },
        editService(id){
            let url = '/admin/get/service/'+ id;

            axios.get(url)
                .then((response) => {
                    console.log(response)
                    this.update_service.id = response.data.service.id;
                    this.update_service.name = response.data.service.name;
                    $('#updateService').modal('show');
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        storeServiceUpdate(){
            let url = '/admin/get/service/'+ this.update_service.id;

            axios.post(url, this.update_service)
                .then((response) => {
                    console.log(response);
                    toastr.success(response.data.success);
                    $('#updateService').modal('hide');
                    $('#addService').modal('hide');
                    $('#service').modal('hide');  
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                })

        }
    }
});