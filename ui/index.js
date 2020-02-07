const electron = require('electron');
const Vue = require('vue/dist/vue.common.js');

const app = new Vue({
	el: '#app',
	data: {
		loading: false,
		pathSegments: [],
		listSegments: []
	},
	methods: {
		list() {
			electron.remote.app.emit('ls-req', this.pathSegments);
			this.loading = true;
		},
		select(segment) {
			this.pathSegments.push(segment);
			this.list();
		},
		back() {
			if(this.loading === true) {
				return;
			}

			this.pathSegments.pop();
			this.list();
		}
	},
	created() {
		electron.remote.app.on('ls-res', listSegments => {
			this.loading = false;
			this.listSegments = listSegments;
		});

		this.list();
	}
});
