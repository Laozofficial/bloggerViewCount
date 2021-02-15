var app = new Vue({
    el: "#app",
    data: {
        tags: {
            total: 0,
            data: [],
            per_page: 10,
        },
        tag: {
            name: "",
            class: "",
        },
        tag_errors: {
            name: null,
            class: null,
        },
        active_seasons: [],
        page: 1,
        loading_tag: false,
        loading_tags: false,
    },
    mounted() {
        this.getTags();
    },
    methods: {
        resetTagFormErrors: function () {
            this.tag_errors = {
                name: null,
                class: null,
            };
        },

        getTags: function () {
            this.loading_tags = true;
            axios
                .get("/admin/forum-tags?page=" + this.page)
                .then(({ data }) => {
                    this.tags = data;
                    this.page = data.current_page;
                })
                .catch(({ response: error }) => {
                    //console.error(error);
                    errorNotify("An Error occured");
                })
                .then(() => {
                    this.loading_tags = false;
                });
        },

        getTag: function (id) {
            this.loading_tag = true;
            axios
                .get("admin/forum-tags/" + id)
                .then(({ data }) => {
                    this.tag = data;
                    $("#tagModal").modal("toggle");
                })
                .catch(({ response: error }) => {
                    //console.error(error);
                    errorNotify("An Error occured");
                })
                .then(() => {
                    this.loading_tag = false;
                });
        },

        resetTagData: function () {
            this.tag = {
                name: "",
                class: "",
            };
            $("#tagModal").modal("toggle");
        },

        submitTagForm: function (e) {
            this.resetTagFormErrors();
            this.loading_tag = true;
            if (this.tag.id) {
                axios
                    .put("/admin/forum-tags/" + this.tag.id, this.tag)
                    .then(({ data }) => {
                        if (data.success) {
                            successNotify(data.success);
                            this.resetTagData();
                            this.getTags();
                        }
                    })
                    .catch(({ response: error }) => {
                        this.handleErrors(error);
                    })
                    .then(() => {
                        this.loading_tag = false;
                    });
            } else {
                axios
                    .post("/admin/forum-tags", this.tag)
                    .then(({ data }) => {
                        if (data.success) {
                            successNotify(data.success);
                            this.resetTagData();
                            this.getTags();
                        }
                    })
                    .catch(({ response: error }) => {
                        this.handleErrors(error);
                    })
                    .then(() => {
                        this.loading_tag = false;
                    });
            }
        },

        handleErrors: function (error) {
            if (error.status == 422) {
                for (let i in error.data.errors) {
                    this.tag_errors[i] = error.data.errors[i][0];
                }
            } else if (error.status == 400) {
                errorNotify(error.data.error);
            }
        },

        deleteTag: function (id) {
            vex.dialog.confirm({
                message: "Are you absolutely sure you want to delete this Tag?",
                callback: (value) => {
                    if (value) {
                        axios
                            .delete("/admin/forum-tags/" + id)
                            .then(({ data }) => {
                                successNotify("Tag deleted successfully");
                                this.getTags();
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
                this.getTags();
            }
            //console.log("changed to", page);
        },
    },
});
