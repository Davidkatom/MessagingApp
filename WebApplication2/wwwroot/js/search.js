//$('tbody').load('/Reviews/Search2?query=' + q)

$(function () {

    $('form').submit(async e => {
        e.preventDefault();
        const q = $('#SearchQuery').val();
        var response = await fetch('Reviews/SearchToJson?query=' + q);
        var data = await response.json();

        let template = $('#reviewRowTemplate').html();
        let results = '';

        for (var item in data) {
            let row = template;
            for (var key in data[item]) {
                row = row.replaceAll('{' + key + '}', data[item][key]);

            }
            results += row;
        }
        $('tbody').html(results);

    })

});
