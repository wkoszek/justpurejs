function list_edit_finalize(evt) {
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

	parent.addEventListener('click', list_edit_start);
}

function list_edit_start(evt) {
	// we enter this function when there's a <li>text..
	// element, we click it and expect to change to <li><input>text..
	console.log('list_edit_start');


	// remove the event listener for the duration of editing.
	this.removeEventListener('click', list_edit_start);

	console.log(evt.currentTarget); // <- wojtek: <li>wojtek</li>

	let editing_val = evt.currentTarget.innerHTML; // wojtek
	evt.currentTarget.innerHTML = "";

	let input_el = document.createElement('input');
	input_el.type = "text";
	input_el.id = "editing";
	input_el.value = editing_val;

	evt.currentTarget.appendChild(input_el);

	input_el.focus();

	list_input_prepare(input_el);

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

function list_input_prepare(input_el) {
	// this function registers common listeners to the <input>
	// object which we need to maintain the editing flow.
	console.log('list_input_prepare');

	input_el.addEventListener('keydown', function (evt) {
		if (evt.code == 'Enter') {
			list_edit_finalize(evt);
		}
	});
	input_el.addEventListener('focusout', function (evt) {
		list_edit_finalize(evt);
	});
}

function list_add(evt) {
	// we enter this function on + press. there's nothing but
	// the <ul> or couple of items <ul><li>..<li>..<li>..</ul>
	// and we just add the new one

	console.log("list_add");

	let input_el = document.createElement('input');
	input_el.type = "text";
	input_el.id = "editing";

	let list_item_new = document.createElement('li');
	list_item_new.appendChild(input_el);

	let list = document.getElementById('list');
	list.appendChild(list_item_new);

	input_el.focus();

	list_input_prepare(input_el);
}

let list_add_el = document.getElementsByClassName('list_add')[0];
console.assert(list_add_el != null, "ops. list_add can't be null");
list_add_el.addEventListener('click', list_add);
