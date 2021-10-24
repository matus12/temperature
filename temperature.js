const TemperatureFactory = (function() {
    function Temperature() {
        this.temp = 0;
    }

    let instance;

    return {
        getInstance: function(){
            if (instance == null) {
                instance = new Temperature();

                instance.constructor = null;
            }
            return instance;
        }
    }
})();

module.exports = TemperatureFactory;
