function newForm(_labels, initialize) {
	var defaultValidators = {
		number: (input, callback) => {
			callback(input['text'] && Number(input['text']) !== Number.NaN);
		},
		require: (input, callback) => {
			callback(!!input['text']);
		}
	};
	
	var form = {};
	var addNumberField = (name, validator) => {
		form[name] = {
			q: _labels[name].title,
			error: _labels[name].error,
			validator: validator || defaultValidators.number
		};
	};
	var addStringField = (name, validator) => {
		form[name] = {
			q: _labels[name].title,
			error: _labels[name].error,
			validator: validator || defaultValidators.require
		};
	};

	form.number = addNumberField;
	form.string = addStringField;
	
	initialize(form);
	
	delete form.number;	
	delete form.string;
	
	return form;
}

module.exports = {
	create: newForm
};