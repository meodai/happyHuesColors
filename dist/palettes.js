(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';
  const palettes = [{"colors":["#fef6e4","#8bd3dd","#f582ae","#f3d2c1"],"name":"Mangala Nymph"},{"colors":["#55423d","#e78fb3","#ffc0ad","#9656a1","#fff3ec","#271c19"],"name":"Dark Fuzz"},{"colors":["#faeee7","#ff8ba7","#ffc6c7","#c3f0ca","#fffffe"],"name":"White Piglet"},{"colors":["#fffffe","#ffd803","#e3f6f5","#bae8e8"],"name":"White Waters"},{"colors":["#0f0e17","#ff8906","#f25f4c","#e53170","#fffffe"],"name":"Flattered Sugar"},{"colors":["#232946","#eebbc3","#fffffe","#b8c1ec","#d4d8f0"],"name":"Midnight Evening"},{"colors":["#f9f4ef","#8c7851","#eaddcf","#f25042","#fffffe"],"name":"Whisper Mossy"},{"colors":["#004643","#f9bc60","#abd1c6","#e16162","#e8e4e6"],"name":"Fizzy Whirlpool"},{"colors":["#eff0f3","#ff8e3c","#fffffe","#d9376e"],"name":"Paper White"},{"colors":["#f8f5f2","#078080","#f45d48","#fffffe"],"name":"Opal Teal"},{"colors":["#fec7d7","#d9d4e7","#a786df","#f9f8fc","#fffffe"],"name":"Dreamy Candy Moon"},{"colors":["#fffffe","#6246ea","#d1d1e9","#e45858"],"name":"Meteor White"},{"colors":["#f2f7f5","#faae2b","#ffa8ba","#fa5246","#00473e"],"name":"Corona Forest"},{"colors":["#16161a","#7f5af0","#72757e","#2cb67d","#fffffe","#242629"],"name":"Candy Grape White"},{"colors":["#fffffe","#3da9fc","#90b4ce","#ef4565","#d8eefe"],"name":"White On Melon"},{"colors":["#fffffe","#00ebc7","#ff5470","#fde24f","#f2f4f6"],"name":"Cheese It White"},{"colors":["#fffffe","#4fc4cf","#994ff3","#fbdd74","#f2eef5","#f6efef"],"name":"White Goddess"}]

  /**
   * @param {Array} palettes
   * @return {Array} Array of arrays of colors
   */
  function flattenPalettes(palettes) {
    return palettes.reduce((acc, palette) => {
      if (palette.hasOwnProperty('palettes')) {
        return acc.concat(flattenPalettes(palette.palettes));
      }
      return acc.concat(palette);
    }, []);
  }

  let localPalettes = palettes;
  let localPalettesFlat = flattenPalettes(localPalettes);

  const colorPalettes = {
    palettes: localPalettes,
    palettesFlat: localPalettesFlat,
    get: (nameOrIndex) => {
      if (typeof nameOrIndex === 'number') {
        return localPalettesFlat[nameOrIndex];
      }
      return localPalettesFlat.find((p) => p.name === nameOrIndex);
    },
    random: (nbr) => {
      if (nbr && typeof nbr != 'number' || nbr > 1 || nbr < 0) {
        throw new Error('random() only accepts a number between 0 and 1');
      }

      return localPalettesFlat[
          Math.floor(
              (nbr || Math.random()) * localPalettesFlat.length,
          )
      ];
    },
    addPalettes: (newPalettes) => {
      localPalettes = palettes.concat(newPalettes);
      localPalettesFlat = flattenPalettes(localPalettes);
    },
  };

  
  exports.colorPalettes = colorPalettes;
}));