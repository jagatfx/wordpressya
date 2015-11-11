var mongoose = require('mongoose');
mongoose.set('debug', true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var productSchema = mongoose.Schema({
    title: String,
    summary: { type: String, default: '' },
    type: String,
    link: { type: String, default: '' },
    source: { type: String, default: '' },
    tags: { type: String, default: '' },
    featureimg: { type: String, default: '' },
    review: { type: String, default: '' },
    visible: Boolean,
    quality: { type: Number, default: -1 },
    cost: { type: Number, default: -1 },
    sales: { type: Number, default: -1 },
    description: { type: String, default: '' }
});

mongoose.model('Product', productSchema);

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});
