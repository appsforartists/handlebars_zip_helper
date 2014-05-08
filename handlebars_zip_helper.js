module.exports.handlebarsZipHelper = handlebarsZipHelper;

function handlebarsZipHelper (signature, options) {
    /*  Converts the lists given into a single list of dictionaries, like
     *  Python's `zip` function.
     *
     *  For instance:
     *
     *      letter = ['a',    'b',     'c'     ];
     *      color  = ['blue', 'green', 'orange'];
     *
     *      zip(letter, color);
     *
     *      // returns [
     *      //     { 'letter': 'a', 'color': 'blue'},
     *      //     { 'letter': 'b', 'color': 'green'},
     *      //     { 'letter': 'c', 'color': 'orange'}
     *      // ];
     *
     *  Usage:
     *      {{# zip "apple, orange, pear as fruit" }}
     *          {{# each fruit }}
     *              Apple:  {{ apple }}
     *              Orange: {{ orange }}
     *              Pear:   {{ pear }}
     *          {{/ each }}
     *      {{/ zip}}
     *
     *  If no name is specified, the resulting list is called "zipped".
     */

    /* TODO:
     *  - assert that commas are between all arguments except "as"
     *  - assert that only [a-z] characters are passed in
     *  - package into a module
     *  - break into functions (e.g. separate the zip function from the Handlebars boilerplate)
     *  - tests are probably a good idea
     *  - write README
     *  - put on Bower
     */

    var context = this;
    signature = signature.trim().replace(/\s+/g, " ").replace(/, /g, ",");

    if (signature.replace(" as ", '').replace(", ", "").trim().indexOf(" ") != -1) {
        throw new Error(
            "The zip helper found a space it wasn't expecting:\n\t"
            + signature
            + "\nDid you forget a comma?"
        )
    }

    var signaturePieces = signature.split(" as ");

    var zippedName = signaturePieces.length == 2
        ? signaturePieces[1]
        : "zipped";

    var listNames = signaturePieces[0].split(',');

    var length = Math.max.apply(this,
        listNames.map(
            function (listName, i, listNames) {
                if (!context.hasOwnProperty(listName)) {
                    throw new Error("The zip helper couldn't find \"" + listName + "\".");
                }

                var listAsArray = Array.prototype.slice.call(context[listName]);

                if (listAsArray.length) {
                    return context[listName].length;

                } else {
                    throw new Error("The zip helper couldn't cast \"" + listName + "\" to an Array.");
                }
            }
        )
    );

    var zipped = Array(length);

    for (var i = 0; i < length; i ++) {
        zipped[i] = {};

        listNames.forEach(
            function (listName, j, listNames) {
                zipped[i][listName] = context[listName][i];
            }
        )
    }

    context[zippedName] = zipped;

    var renderedInnerTemplate = options.fn(this);

    delete context[zippedName];

    return renderedInnerTemplate;
}