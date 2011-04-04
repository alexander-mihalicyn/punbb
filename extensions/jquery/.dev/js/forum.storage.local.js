if (typeof FORUM === "undefined" || !FORUM) {
	var FORUM = {};
}

if (typeof FORUM.storage === "undefined" || !FORUM.storage) {
	FORUM.storage = {};
}

FORUM.storage.local = function () {
	var storage = null,
		supported = false;

	return {
		init: function() {
			try {
				if (window.localStorage) {
					storage = window.localStorage;
					supported = true;
					return;
				}

				if (window.globalStorage) {
					storage = window.globalStorage[document.domain];
					supported = true;
					return;
				}
			} catch(e) {
				supported = false;
			}
		},

		setItem: function (name, value) {
			if (!supported) {
				return false;
			}

			storage.setItem(name, value);
		},

		getItem: function (name) {
			if (!supported) {
				return null;
			}

			return storage.getItem(name);
		},

		removeItem: function (name) {
			if (!supported) {
				return null;
			}

			storage.removeItem(name);
		},

		clear: function () {
			if (!supported) {
				return null;
			}

			storage.clear();
		},

		supported: function () {
			return supported;
		}
	};
}();



// RUN
jQuery(document).ready(function () {
	FORUM.storage.local.init();
});