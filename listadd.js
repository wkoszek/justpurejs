class WKList {
	constructor(cln) {
		this.cln = cln;
	}

	list_edit_finalize(evt) {
		// we enter this function when we're <li><input>value...
		// and we want to become <li>value
		console.log('list_edit_finalize');

		console.log(evt.currentTarget.value); // <- that works.
		let input_val = evt.currentTarget.value;
		
		let parent = evt.currentTarget.parentNode;
		evt.currentTarget.remove();
		parent.innerHTML = input_val;

		// i kinda need to go back and forth from adding and 
		// editing, which means adding event listeners
		// in the right places.

		let this_saved = this;
		parent.addEventListener('click', function list_edit_start_helper(evt) {
			this_saved.list_edit_start(evt);
		});
	}

	list_edit_start(evt) {
		// we enter this function when there's a <li>text..
		// element, we click it and expect to change to <li><input>text..
		console.log('list_edit_start');

		console.log(this);
		console.log(evt.currentTarget);

		// remove the event listener for the duration of editing.
		//this.removeEventListener('click', this.list_edit_start);
		//evt.currentTarget.removeEventListener('click', this.list_edit_start);
		//evt.currentTarget.removeEventListener('click', arguments.callee);
		//evt.currentTarget.removeEventListener('click', list_edit_start_helper);

		console.log(evt.currentTarget); // <- wojtek: <li>wojtek</li>

		let editing_val = evt.currentTarget.innerHTML; // wojtek
		evt.currentTarget.innerHTML = "";

		let input_el = document.createElement('input');
		input_el.type = "text";
		input_el.id = "editing";
		input_el.value = editing_val;

		evt.currentTarget.appendChild(input_el);

		input_el.focus();

		this.list_input_prepare(input_el);

	//      sleepy. will flush the recording to the disk and fix it adter I
	//      wake up.  something stinks here. I think there'll be a chance to
	//      add more code reuse anyway -- i always start really stupid and
	//      try to optimize later, when i understand stuff a little better.

	//	let list_item_new = document.createElement('li');
	//	list_item_new.appendChild(input_el);
	//
	//	let list = document.getElementById('list');
	//	list.appendChild(list_item_new);

	}

	list_input_prepare(input_el) {
		// this function registers common listeners to the <input>
		// object which we need to maintain the editing flow.
		console.log('list_input_prepare');

		let saved_this = this;
		input_el.addEventListener('keydown', function (evt) {
			if (evt.code == 'Enter') {
				saved_this.list_edit_finalize(evt);
			}
		});
		input_el.addEventListener('focusout', function (evt) {
			saved_this.list_edit_finalize(evt);
		});
	}

	list_add(evt) {
		// we enter this function on + press. there's nothing but
		// the <ul> or couple of items <ul><li>..<li>..<li>..</ul>
		// and we just add the new one

		console.log("list_add");

		let input_el = document.createElement('input');
		input_el.className = this.cln;
		input_el.type = "text";
		input_el.id = "editing";

		let list_item_new = document.createElement('li');
		list_item_new.appendChild(input_el);

		let list = document.getElementById('list');
		list.appendChild(list_item_new);

		input_el.focus();

		console.log(this);

		this.list_input_prepare(input_el);
	}

	list_register() {
		let list_add_el = document.getElementsByClassName(this.cln)[0];
		console.assert(list_add_el != null, "ops. list_add can't be null");

		let this_saved = this;
		list_add_el.addEventListener('click', function() {
			console.log('+ clicked');
			this_saved.list_add();
		});
	}
}
let wklist = new WKList('list_add');
wklist.list_register()
