(function () {
	var price_slider = document.getElementById('price_slider');
	noUiSlider.create(price_slider, {
		start: [3000, 23000],
		connect: true,
		step: 500,
		range: {
			'min': 3000,
			'max': 35000
		},
	});
	var price_to_input = document.getElementById('price_to');
	var price_from_input = document.getElementById('price_from');
	var price_to = document.querySelector('.price_to');
	var price_from = document.querySelector('.price_from');
	price_slider.noUiSlider.on('update', function (values, handle) {
		var value = values[handle];
		if (handle) {
			price_to_input.value = Math.round(value);
			price_to.innerHTML = Math.round(value) + '<span>₽</span>';
		} else {
			price_from_input.value = Math.round(value);
			price_from.innerHTML = Math.round(value) + '<span>₽</span>';
		}
	});


	var legends = document.querySelectorAll('.filter legend');
	legends.forEach(function(item){
		item.addEventListener('click', function(evt){
			this.parentElement.classList.toggle('hidden');
		})
	});
	var category__drop = document.querySelectorAll('.category__drop');
	category__drop.forEach(function(item){
		item.addEventListener('click', function(evt){
			this.parentElement.classList.toggle('hidden');
		})
	});

	var filter_form = document.querySelector('.filter');
	var btn_clear_filter = filter_form.querySelector('.filter__clear');
	var filter_form_inputs = filter_form.querySelectorAll('input');
	btn_clear_filter.addEventListener('click', function(evt){
		filter_form_inputs.forEach(function(item){
			item.checked = false;
		});
	});

	var body = document.querySelector('body');
	var burger = document.querySelector('.burger');
	var popup__close = document.querySelector('.popup__close');
	var popup_menu = document.querySelector('.popup_menu');
	burger.addEventListener('click', function(evt) {
		evt.preventDefault;
		popup_menu.classList.add('active');
		body.classList.add('ofh');
	});
	popup__close.addEventListener('click', function(evt) {
		evt.preventDefault;
		popup_menu.classList.remove('active');
		body.classList.remove('ofh');
	});

	var filter = document.querySelector('.filter');
	var filter_setup = filter.querySelector('.filter_setup');
	var open_filter = document.querySelector('.open_filter');

	open_filter.addEventListener('click', function(evt) {
		evt.preventDefault;
		filter.classList.add('active');
		body.classList.add('ofh');
	});
	filter_setup.addEventListener('click', function(evt) {
		filter.classList.remove('active');
		body.classList.remove('ofh');
	});

})();