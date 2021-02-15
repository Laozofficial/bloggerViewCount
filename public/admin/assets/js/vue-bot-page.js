var app = new Vue({
    el: "#app",
    data: {
        bots: {
            total: 0,
            data: [],
            per_page: 10,
        },
        bot: {
            user_id: 0,
            position: 0,
            max_points: 0,
            min_points: 0,
            max_attempts: 0,
            min_attempts: 0,
        },
        bot_errors: {
            user_id: null,
            position: null,
            max_points: null,
            min_points: null,
            max_attempts: null,
            min_attempts: null,
        },
        users: [],
        page: 1,
        loading_bot: false,
        loading_bots: false,
    },
    mounted() {
        this.getBots();
        this.getUsers();
    },
    methods: {
        resetBotFormErrors: function () {
            this.bot_errors = {
                user_id: null,
                position: null,
                max_points: null,
                min_points: null,
                max_attempts: null,
                min_attempts: null,
            };
        },

        getUsers: function () {
            axios
                .get("/admin/all-users")
                .then(({ data }) => {
                    this.users = data;
                })
                .catch(({ response: error }) => {
                    //console.error(error);
                    if (error.status == 500) this.getUsers();
                    errorNotify("An Error occured Fetching Users");
                });
        },

        getBots: function () {
            this.loading_bots = true;
            axios
                .get("/admin/bots?page=" + this.page)
                .then(({ data }) => {
                    this.bots = data;
                    this.page = data.current_page;
                })
                .catch(({ response: error }) => {
                    //console.error(error);
                    errorNotify("An Error occured");
                })
                .then(() => {
                    this.loading_bots = false;
                });;
        },

        getBot: function (id) {                                 
            this.loading_bot = true;
            axios
                .get("admin/bots/" + id)
                .then(({ data }) => {
                    this.bot = data;
                    $("#botModal").modal("toggle");
                })
                .catch(({ response: error }) => {
                    //console.error(error);
                    errorNotify("An Error occured");
                })
                .then(() => {
                    this.loading_bot = false;
                });
        },

        resetBotData: function () {
            this.bot = {
                user_id: 0,
                position: 0,
                max_points: 0,
                min_points: 0,
                max_attempts: 0,
                min_attempts: 0,
            };
            $("#botModal").modal("toggle");
        },

        submitBotForm: function (e) {
            this.resetBotFormErrors();
            this.loading_bot = true;
            if (this.bot.id) {
                axios
                    .put("/admin/bots/" + this.bot.id, this.bot)
                    .then(({ data }) => {
                        if (data.success) {
                            successNotify(data.success);
                            this.resetBotData();
                            this.getBots();
                        }
                    })
                    .catch(({ response: error }) => {
                        this.handleErrors(error);
                    })
                    .then(() => {
                        this.loading_bot = false;
                    });
            } else {
                axios
                    .post("/admin/bots", this.bot)
                    .then(({ data }) => {
                        if (data.success) {
                            successNotify(data.success);
                            this.resetBotData();
                            this.getBots();
                        }
                    })
                    .catch(({ response: error }) => {
                        this.handleErrors(error);
                    })
                    .then(() => {
                        this.loading_bot = false;
                    });
            }
        },

        handleErrors: function (error) {
            if (error.status == 422) {
                for (let i in error.data.errors) {
                    this.bot_errors[i] = error.data.errors[i][0];
                }
            } else if (error.status == 400) {
                errorNotify(error.data.error);
            }
        },

        deleteBot: function (id) {
            vex.dialog.confirm({
                message: "Are you absolutely sure you want to delete this Bot?",
                callback: (value) => {
                    if (value) {
                        axios
                            .delete("/admin/bots/" + id)
                            .then(({ data }) => {
                                successNotify("Bot deleted successfully");
                                this.getBots();
                            })
                            .catch(({ response: error }) => {
                                if (error.status == 400) {
                                    errorNotify(error.data.error);
                                }
                            });
                    }
                },
            });
        },

        pageChange(page) {
            if (this.page != page && page != 0) {
                this.page = page;
                this.getBots();
            }
            //console.log("changed to", page);
        },
    },
});
