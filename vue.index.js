var app = new Vue({
    el: "#app",
    data: {
        posts: [{
                title: "hello",
                text: "world"
            }
        ],
        visibility: [true],
        confirmations: true
    },
    methods: {
        _add: function () {
            this.posts.push({
                title: "new post",
                text: "text"
            });
            this.visibility.push(true);
            this.save_json();
        },
        _edit: function (index) {
            this.visibility = new Array(this.visibility.length).fill(true);
            this.visibility[index] = false;
            var temp = this.visibility;
            this.visibility = [];
            this.visibility = temp;
            Vue.nextTick(function () {
                $('input').eq(1).focus();
            })
        },
        _edited: function (index) {
            this.visibility[index] = true;
            var temp = this.visibility;
            this.visibility = [];
            this.visibility = temp;
            this.save_json();
        },
        _delete: function (index) {
            if (this.confirmations) {
                var question = confirm("Delete post?");
                if (question == true) {
                    this.posts.splice(index, 1);
                    this.save_json();
                }
            } else {
                this.posts.splice(index, 1);
                this.save_json();
            }
        },
        load_json: function () {
            var loaded;
            $.ajax({
                url: "posts.json",
                cache: false,
                async: false,
            }).done(function (data) {
                loaded = data;
            });
            for (i = 0; i < loaded.length; i++) {
                this.visibility.push(true);
            }
            return loaded;
        },
        save_json: function () {
            $.ajax({
                type: "POST",
                url: "saver.php",
                cache: false,
                async: false,
                data: {
                    data: JSON.stringify(this.posts)
                }
            });
        }
    },
    mounted: function () {
        this.posts = this.load_json();
    }
})