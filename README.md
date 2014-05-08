handlebars_zip_helper
=====================

Converts the lists given into a single list of dictionaries, like
Python's `zip` function.

For instance:

    letter = ['a',    'b',     'c'     ];
    color  = ['blue', 'green', 'orange'];

    zip(letter, color);

    // returns [
    //     { 'letter': 'a', 'color': 'blue'},
    //     { 'letter': 'b', 'color': 'green'},
    //     { 'letter': 'c', 'color': 'orange'}
    // ];

Usage:

    {{# zip "apple, orange, pear as fruit" }}
        {{# each fruit }}
            Apple:  {{ apple }}
            Orange: {{ orange }}
            Pear:   {{ pear }}
        {{/ each }}
    {{/ zip}}

If no name is specified, the resulting list is called `zipped`.
