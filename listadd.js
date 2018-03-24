function list_edit_finalize(evt) {
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
	// remove the event listener for the duration of editing.
	this.removeEventListener('click', list_edit_start);

	console.log('list_edit_start');
	console.log(evt.currentTarget); // <- wojtek: <li>wojtek</li>

	let editing_val = evt.currentTarget.innerHTML; // wojtek
	evt.currentTarget.innerHTML = "";

	let input_el = document.createElement('input');
	input_el.type = "text";
	input_el.id = "editing";
	input_el.value = editing_val;

	evt.currentTarget.appendChild(input_el);

	input_el.focus();

	input_el.addEventListener('keydown', function (evt) {
		if (evt.code == 'Enter') {
			list_edit_finalize(evt);
		}
	});


	// sleepy. will flush the recording to the disk and fix it
	// adter I wake up.

	// something stinks here. I think there'll be a chance to add more code reuse
	// anyway -- i always start really stupid and try to optimize later, when
	// i understand stuff a little better.

//	let list_item_new = document.createElement('li');
//	list_item_new.appendChild(input_el);
//
//	let list = document.getElementById('list');
//	list.appendChild(list_item_new);

}

function list_add(evt) {		// kinda stinks to name is list_add as it's 'editing' also, but
					// we'll think of a better name soon
	console.log("list_add");

	let input_el = document.createElement('input');
	input_el.type = "text";
	input_el.id = "editing";

	let list_item_new = document.createElement('li');
	list_item_new.appendChild(input_el);

	let list = document.getElementById('list');
	list.appendChild(list_item_new);

	input_el.focus();

	input_el.addEventListener('keydown', function (evt) {
		if (evt.code == 'Enter') {
			list_edit_finalize(evt);
		}
	});

}

let list_add_el = document.getElementsByClassName('list_add')[0];
console.assert(list_add_el != null, "ops. list_add can't be null");
list_add_el.addEventListener('click', list_add);

document.addEventListener('click', function () {
	for (let input_el of document.getElementsByTagName('input')) {
		console.log(input_el);
		//let input_elv = input_el.value;
		//let parent = input_el.parentNode;
		//input_el.remove();
		//parent.innerHTML = input_el.value;
		//parent.addEventListener('click', list_edit_start);
	}
	console.log('dddggg');
});
