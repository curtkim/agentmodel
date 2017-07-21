var webppl = require("/Users/curt/projects/ml/agentmodel/node_modules/webppl/src/main.js");
var __runner__ = util.trampolineRunners.cli();
function topK(s, x) {
  console.log(x);
};
var main = (function (_globalCurrentAddress) {
    return function (p) {
        return function (runTrampoline) {
            return function (s, k, a) {
                runTrampoline(function () {
                    return p(s, k, a);
                });
            };
        };
    }(function (globalStore, _k0, _address0) {
        var _currentAddress = _address0;
        _addr.save(_globalCurrentAddress, _address0);
        var Gaussian = function Gaussian(globalStore, _k375, _address23, params) {
            var _currentAddress = _address23;
            _addr.save(_globalCurrentAddress, _address23);
            return function () {
                return _k375(globalStore, util.jsnew(dists.Gaussian, params));
            };
        };
        return function () {
            return Gaussian(globalStore, function (globalStore, _result1) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return sample(globalStore, _k0, _address0.concat('_249'), _result1);
                };
            }, _address0.concat('_248'), {
                mu: 0,
                sigma: 1
            });
        };
    });
});

webppl.runEvaled(main, __runner__, {}, {}, topK, '');