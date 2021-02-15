/* 'esversion':6 */
Vue.component("vue-page-button", {
    props: {
        page: {
            type: [Number, String],
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        html: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: "",
        },
        loading: {
            type: Boolean,
            default: false,
        },
        disableStyling: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        buttonClasses() {
            if (this.disableStyling) {
                return {};
            }
            return {
                btn: true,
                "btn-primary": this.active,
                "vue-ads-cursor-default": this.active || this.disabled,
                "vue-ads-bg-gray-200": this.disabled && this.page !== "...",
                "vue-ads-text-gray": this.disabled && this.page !== "...",
                "btn-secondary": !this.active && !this.disabled,
            };
        },
    },
    methods: {
        pageChange() {
            if (this.page === "..." || this.disabled || this.active) {
                return;
            }
            this.$emit("page-change");
        },
    },
    template: `<button :class="buttonClasses" :disabled="disabled" :title="title" @click="pageChange">
                <i v-if="loading" class="fa fa-spinner fa-spin" />
                <span v-else v-html="html" /> 
              </button>`,
});

Vue.component("vue-pagination", {
    props: {
        page: {
            type: Number,
            default: 1,
            validator: (page) => {
                return page >= 0;
            },
        },
        itemsPerPage: {
            type: Number,
            default: 10,
            validator: (itemsPerPage) => {
                return itemsPerPage > 0;
            },
        },
        maxVisiblePages: {
            type: Number,
            default: 5,
            validator: (maxVisiblePages) => {
                return maxVisiblePages > 0;
            },
        },
        totalItems: {
            type: Number,
            required: true,
            validator: (totalItems) => {
                return totalItems >= 0;
            },
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        start() {
            return (this.page - 1) * this.itemsPerPage + 1;
        },
        end() {
            let end = this.start - 1 + this.itemsPerPage;
            return this.totalItems < end ? this.totalItems : end;
        },
        totalPages() {
            if (this.itemsPerPage === 0) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        pages() {
            let filteredPages = this.filteredPages;
            let pages = filteredPages
                ? [
                      filteredPages[0] - 1 === 1 ? 1 : "...",
                      ...filteredPages,
                      filteredPages[filteredPages.length - 1] + 1 ===
                      this.totalPages - 2
                          ? this.totalPages - 2
                          : "...",
                  ]
                : [...Array(this.totalPages - 2).keys()].map(
                      (page) => page + 2
                  );
            return [
                this.page > 1 ? this.page - 1 : 1,
                1,
                ...pages,
                this.totalPages,
                this.page + 1,
            ];
        },
        filteredPages() {
            let diff = this.maxVisiblePages / 2;
            let toFilterPages = [...Array(this.totalPages).keys()].slice(2, -2);
            if (toFilterPages.length > this.maxVisiblePages) {
                let diffFirst = this.page - toFilterPages[0];
                let diffLast =
                    this.page - toFilterPages[toFilterPages.length - 1];
                if (diffFirst < diff) {
                    return toFilterPages.slice(0, this.maxVisiblePages);
                } else if (diffLast >= -diff) {
                    return toFilterPages.slice(-this.maxVisiblePages);
                } else {
                    return toFilterPages.filter((page) => {
                        let diffPage = this.page - page;
                        return diffPage < 0
                            ? Math.abs(diffPage) <= diff
                            : diffPage < diff;
                    });
                }
            }
            return null;
        },
        buttons() {
            return this.pages.map((page, key) => {
                //console.log("page =>", page, key, this.page);
                return {
                    page,
                    active: key === this.page,
                    disabled: this.disabled(page, key),
                    html: this.html(page, key),
                    title: this.title(key),
                    loading: this.loading && page === this.page,
                };
            });
        },
    },
    watch: {
        page: {
            handler: "pageChange",
            immediate: true,
        },
        itemsPerPage: {
            handler: "rangeChange",
        },
        totalItems: {
            handler: "rangeChange",
        },
    },
    methods: {
        pageChange(page) {
            if (page > this.totalPages && page !== 0 && this.totalPages !== 0) {
                throw new Error(
                    "page may be maximum the total number of pages minus one"
                );
            }
            this.rangeChange();
        },
        rangeChange() {
            if (this.page > this.totalPages && this.totalPages !== 0) {
                this.$emit("page-change", this.totalPages - 1);
            } else {
                this.$emit("range-change", this.start, this.end);
            }
        },
        html(page, key) {
            if (key === 0) {
                return '<i class="fa fa-angle-left"></i>';
            }
            if (key === this.pages.length - 1) {
                return '<i class="fa fa-angle-right"></i>';
            }
            if (page === "...") {
                return page;
            }
            return page + "";
        },
        disabled(page, key) {
            return (
                (key === 0 && this.page === 1) ||
                (key === this.pages.length - 1 &&
                    this.page === this.totalPages) ||
                page === "..."
            );
        },
        title(key) {
            if (key === 0) {
                return "previous";
            }
            if (key === this.pages.length - 1) {
                return "next";
            }
            return "";
        },
    },
    template: `<div v-if="totalPages > 0" class="vue-ads-flex vue-ads-m-2 vue-ads-px-0 vue-ads-text-xs">
              <slot
                  :start="start"
                  :end="end"
                  :total="totalItems"
              >
                  <div
                      class="pr-2 vue-ads-leading-loose"
                  >
                      {{ start }} - {{ end }} of {{ totalItems }} items
                  </div>
              </slot>
              <div v-if="totalPages > 1" class="vue-ads-flex-grow vue-ads-flex vue-ads-justify-end">
                  <slot
                      :buttons="buttons"
                      name="buttons"
                  >
                      <vue-page-button
                          v-for="(button, key) in buttons"
                          :key="key"
                          v-bind="button"
                          @page-change="$emit('page-change', button.page)"
                      />
                  </slot>
              </div>
          </div>`,
});
