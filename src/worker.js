var __create = Object.create;
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

// node_modules/qrcode-generator/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode-generator/qrcode.js"(exports, module) {
    var qrcode2 = (function() {
      var qrcode3 = /* @__PURE__ */ __name(function(typeNumber, errorCorrectionLevel) {
        var PAD0 = 236;
        var PAD1 = 17;
        var _typeNumber = typeNumber;
        var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
        var _modules = null;
        var _moduleCount = 0;
        var _dataCache = null;
        var _dataList = [];
        var _this = {};
        var makeImpl = /* @__PURE__ */ __name(function(test, maskPattern) {
          _moduleCount = _typeNumber * 4 + 17;
          _modules = (function(moduleCount) {
            var modules = new Array(moduleCount);
            for (var row = 0; row < moduleCount; row += 1) {
              modules[row] = new Array(moduleCount);
              for (var col = 0; col < moduleCount; col += 1) {
                modules[row][col] = null;
              }
            }
            return modules;
          })(_moduleCount);
          setupPositionProbePattern(0, 0);
          setupPositionProbePattern(_moduleCount - 7, 0);
          setupPositionProbePattern(0, _moduleCount - 7);
          setupPositionAdjustPattern();
          setupTimingPattern();
          setupTypeInfo(test, maskPattern);
          if (_typeNumber >= 7) {
            setupTypeNumber(test);
          }
          if (_dataCache == null) {
            _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
          }
          mapData(_dataCache, maskPattern);
        }, "makeImpl");
        var setupPositionProbePattern = /* @__PURE__ */ __name(function(row, col) {
          for (var r = -1; r <= 7; r += 1) {
            if (row + r <= -1 || _moduleCount <= row + r) continue;
            for (var c = -1; c <= 7; c += 1) {
              if (col + c <= -1 || _moduleCount <= col + c) continue;
              if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }, "setupPositionProbePattern");
        var getBestMaskPattern = /* @__PURE__ */ __name(function() {
          var minLostPoint = 0;
          var pattern = 0;
          for (var i = 0; i < 8; i += 1) {
            makeImpl(true, i);
            var lostPoint = QRUtil.getLostPoint(_this);
            if (i == 0 || minLostPoint > lostPoint) {
              minLostPoint = lostPoint;
              pattern = i;
            }
          }
          return pattern;
        }, "getBestMaskPattern");
        var setupTimingPattern = /* @__PURE__ */ __name(function() {
          for (var r = 8; r < _moduleCount - 8; r += 1) {
            if (_modules[r][6] != null) {
              continue;
            }
            _modules[r][6] = r % 2 == 0;
          }
          for (var c = 8; c < _moduleCount - 8; c += 1) {
            if (_modules[6][c] != null) {
              continue;
            }
            _modules[6][c] = c % 2 == 0;
          }
        }, "setupTimingPattern");
        var setupPositionAdjustPattern = /* @__PURE__ */ __name(function() {
          var pos = QRUtil.getPatternPosition(_typeNumber);
          for (var i = 0; i < pos.length; i += 1) {
            for (var j = 0; j < pos.length; j += 1) {
              var row = pos[i];
              var col = pos[j];
              if (_modules[row][col] != null) {
                continue;
              }
              for (var r = -2; r <= 2; r += 1) {
                for (var c = -2; c <= 2; c += 1) {
                  if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                    _modules[row + r][col + c] = true;
                  } else {
                    _modules[row + r][col + c] = false;
                  }
                }
              }
            }
          }
        }, "setupPositionAdjustPattern");
        var setupTypeNumber = /* @__PURE__ */ __name(function(test) {
          var bits = QRUtil.getBCHTypeNumber(_typeNumber);
          for (var i = 0; i < 18; i += 1) {
            var mod = !test && (bits >> i & 1) == 1;
            _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
          }
          for (var i = 0; i < 18; i += 1) {
            var mod = !test && (bits >> i & 1) == 1;
            _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
          }
        }, "setupTypeNumber");
        var setupTypeInfo = /* @__PURE__ */ __name(function(test, maskPattern) {
          var data = _errorCorrectionLevel << 3 | maskPattern;
          var bits = QRUtil.getBCHTypeInfo(data);
          for (var i = 0; i < 15; i += 1) {
            var mod = !test && (bits >> i & 1) == 1;
            if (i < 6) {
              _modules[i][8] = mod;
            } else if (i < 8) {
              _modules[i + 1][8] = mod;
            } else {
              _modules[_moduleCount - 15 + i][8] = mod;
            }
          }
          for (var i = 0; i < 15; i += 1) {
            var mod = !test && (bits >> i & 1) == 1;
            if (i < 8) {
              _modules[8][_moduleCount - i - 1] = mod;
            } else if (i < 9) {
              _modules[8][15 - i - 1 + 1] = mod;
            } else {
              _modules[8][15 - i - 1] = mod;
            }
          }
          _modules[_moduleCount - 8][8] = !test;
        }, "setupTypeInfo");
        var mapData = /* @__PURE__ */ __name(function(data, maskPattern) {
          var inc = -1;
          var row = _moduleCount - 1;
          var bitIndex = 7;
          var byteIndex = 0;
          var maskFunc = QRUtil.getMaskFunction(maskPattern);
          for (var col = _moduleCount - 1; col > 0; col -= 2) {
            if (col == 6) col -= 1;
            while (true) {
              for (var c = 0; c < 2; c += 1) {
                if (_modules[row][col - c] == null) {
                  var dark = false;
                  if (byteIndex < data.length) {
                    dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                  }
                  var mask = maskFunc(row, col - c);
                  if (mask) {
                    dark = !dark;
                  }
                  _modules[row][col - c] = dark;
                  bitIndex -= 1;
                  if (bitIndex == -1) {
                    byteIndex += 1;
                    bitIndex = 7;
                  }
                }
              }
              row += inc;
              if (row < 0 || _moduleCount <= row) {
                row -= inc;
                inc = -inc;
                break;
              }
            }
          }
        }, "mapData");
        var createBytes = /* @__PURE__ */ __name(function(buffer, rsBlocks) {
          var offset = 0;
          var maxDcCount = 0;
          var maxEcCount = 0;
          var dcdata = new Array(rsBlocks.length);
          var ecdata = new Array(rsBlocks.length);
          for (var r = 0; r < rsBlocks.length; r += 1) {
            var dcCount = rsBlocks[r].dataCount;
            var ecCount = rsBlocks[r].totalCount - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);
            dcdata[r] = new Array(dcCount);
            for (var i = 0; i < dcdata[r].length; i += 1) {
              dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
            }
            offset += dcCount;
            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);
            for (var i = 0; i < ecdata[r].length; i += 1) {
              var modIndex = i + modPoly.getLength() - ecdata[r].length;
              ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
            }
          }
          var totalCodeCount = 0;
          for (var i = 0; i < rsBlocks.length; i += 1) {
            totalCodeCount += rsBlocks[i].totalCount;
          }
          var data = new Array(totalCodeCount);
          var index = 0;
          for (var i = 0; i < maxDcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
              if (i < dcdata[r].length) {
                data[index] = dcdata[r][i];
                index += 1;
              }
            }
          }
          for (var i = 0; i < maxEcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
              if (i < ecdata[r].length) {
                data[index] = ecdata[r][i];
                index += 1;
              }
            }
          }
          return data;
        }, "createBytes");
        var createData = /* @__PURE__ */ __name(function(typeNumber2, errorCorrectionLevel2, dataList) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
          var buffer = qrBitBuffer();
          for (var i = 0; i < dataList.length; i += 1) {
            var data = dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
            data.write(buffer);
          }
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i += 1) {
            totalDataCount += rsBlocks[i].dataCount;
          }
          if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
          }
          if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
          }
          while (buffer.getLengthInBits() % 8 != 0) {
            buffer.putBit(false);
          }
          while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD0, 8);
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD1, 8);
          }
          return createBytes(buffer, rsBlocks);
        }, "createData");
        _this.addData = function(data, mode) {
          mode = mode || "Byte";
          var newData = null;
          switch (mode) {
            case "Numeric":
              newData = qrNumber(data);
              break;
            case "Alphanumeric":
              newData = qrAlphaNum(data);
              break;
            case "Byte":
              newData = qr8BitByte(data);
              break;
            case "Kanji":
              newData = qrKanji(data);
              break;
            default:
              throw "mode:" + mode;
          }
          _dataList.push(newData);
          _dataCache = null;
        };
        _this.isDark = function(row, col) {
          if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
            throw row + "," + col;
          }
          return _modules[row][col];
        };
        _this.getModuleCount = function() {
          return _moduleCount;
        };
        _this.make = function() {
          if (_typeNumber < 1) {
            var typeNumber2 = 1;
            for (; typeNumber2 < 40; typeNumber2++) {
              var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
              var buffer = qrBitBuffer();
              for (var i = 0; i < _dataList.length; i++) {
                var data = _dataList[i];
                buffer.put(data.getMode(), 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
                data.write(buffer);
              }
              var totalDataCount = 0;
              for (var i = 0; i < rsBlocks.length; i++) {
                totalDataCount += rsBlocks[i].dataCount;
              }
              if (buffer.getLengthInBits() <= totalDataCount * 8) {
                break;
              }
            }
            _typeNumber = typeNumber2;
          }
          makeImpl(false, getBestMaskPattern());
        };
        _this.createTableTag = function(cellSize, margin) {
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          var qrHtml = "";
          qrHtml += '<table style="';
          qrHtml += " border-width: 0px; border-style: none;";
          qrHtml += " border-collapse: collapse;";
          qrHtml += " padding: 0px; margin: " + margin + "px;";
          qrHtml += '">';
          qrHtml += "<tbody>";
          for (var r = 0; r < _this.getModuleCount(); r += 1) {
            qrHtml += "<tr>";
            for (var c = 0; c < _this.getModuleCount(); c += 1) {
              qrHtml += '<td style="';
              qrHtml += " border-width: 0px; border-style: none;";
              qrHtml += " border-collapse: collapse;";
              qrHtml += " padding: 0px; margin: 0px;";
              qrHtml += " width: " + cellSize + "px;";
              qrHtml += " height: " + cellSize + "px;";
              qrHtml += " background-color: ";
              qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
              qrHtml += ";";
              qrHtml += '"/>';
            }
            qrHtml += "</tr>";
          }
          qrHtml += "</tbody>";
          qrHtml += "</table>";
          return qrHtml;
        };
        _this.createSvgTag = function(cellSize, margin, alt, title) {
          var opts = {};
          if (typeof arguments[0] == "object") {
            opts = arguments[0];
            cellSize = opts.cellSize;
            margin = opts.margin;
            alt = opts.alt;
            title = opts.title;
          }
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          alt = typeof alt === "string" ? { text: alt } : alt || {};
          alt.text = alt.text || null;
          alt.id = alt.text ? alt.id || "qrcode-description" : null;
          title = typeof title === "string" ? { text: title } : title || {};
          title.text = title.text || null;
          title.id = title.text ? title.id || "qrcode-title" : null;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var c, mc, r, mr, qrSvg = "", rect;
          rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
          qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
          qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
          qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
          qrSvg += ' preserveAspectRatio="xMinYMin meet"';
          qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
          qrSvg += ">";
          qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
          qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
          qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
          qrSvg += '<path d="';
          for (r = 0; r < _this.getModuleCount(); r += 1) {
            mr = r * cellSize + margin;
            for (c = 0; c < _this.getModuleCount(); c += 1) {
              if (_this.isDark(r, c)) {
                mc = c * cellSize + margin;
                qrSvg += "M" + mc + "," + mr + rect;
              }
            }
          }
          qrSvg += '" stroke="transparent" fill="black"/>';
          qrSvg += "</svg>";
          return qrSvg;
        };
        _this.createDataURL = function(cellSize, margin) {
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;
          return createDataURL(size, size, function(x, y) {
            if (min <= x && x < max && min <= y && y < max) {
              var c = Math.floor((x - min) / cellSize);
              var r = Math.floor((y - min) / cellSize);
              return _this.isDark(r, c) ? 0 : 1;
            } else {
              return 1;
            }
          });
        };
        _this.createImgTag = function(cellSize, margin, alt) {
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var img = "";
          img += "<img";
          img += ' src="';
          img += _this.createDataURL(cellSize, margin);
          img += '"';
          img += ' width="';
          img += size;
          img += '"';
          img += ' height="';
          img += size;
          img += '"';
          if (alt) {
            img += ' alt="';
            img += escapeXml(alt);
            img += '"';
          }
          img += "/>";
          return img;
        };
        var escapeXml = /* @__PURE__ */ __name(function(s) {
          var escaped = "";
          for (var i = 0; i < s.length; i += 1) {
            var c = s.charAt(i);
            switch (c) {
              case "<":
                escaped += "&lt;";
                break;
              case ">":
                escaped += "&gt;";
                break;
              case "&":
                escaped += "&amp;";
                break;
              case '"':
                escaped += "&quot;";
                break;
              default:
                escaped += c;
                break;
            }
          }
          return escaped;
        }, "escapeXml");
        var _createHalfASCII = /* @__PURE__ */ __name(function(margin) {
          var cellSize = 1;
          margin = typeof margin == "undefined" ? cellSize * 2 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;
          var y, x, r1, r2, p;
          var blocks = {
            "\u2588\u2588": "\u2588",
            "\u2588 ": "\u2580",
            " \u2588": "\u2584",
            "  ": " "
          };
          var blocksLastLineNoMargin = {
            "\u2588\u2588": "\u2580",
            "\u2588 ": "\u2580",
            " \u2588": " ",
            "  ": " "
          };
          var ascii = "";
          for (y = 0; y < size; y += 2) {
            r1 = Math.floor((y - min) / cellSize);
            r2 = Math.floor((y + 1 - min) / cellSize);
            for (x = 0; x < size; x += 1) {
              p = "\u2588";
              if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
                p = " ";
              }
              if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
                p += " ";
              } else {
                p += "\u2588";
              }
              ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
            }
            ascii += "\n";
          }
          if (size % 2 && margin > 0) {
            return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("\u2580");
          }
          return ascii.substring(0, ascii.length - 1);
        }, "_createHalfASCII");
        _this.createASCII = function(cellSize, margin) {
          cellSize = cellSize || 1;
          if (cellSize < 2) {
            return _createHalfASCII(margin);
          }
          cellSize -= 1;
          margin = typeof margin == "undefined" ? cellSize * 2 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;
          var y, x, r, p;
          var white = Array(cellSize + 1).join("\u2588\u2588");
          var black = Array(cellSize + 1).join("  ");
          var ascii = "";
          var line = "";
          for (y = 0; y < size; y += 1) {
            r = Math.floor((y - min) / cellSize);
            line = "";
            for (x = 0; x < size; x += 1) {
              p = 1;
              if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
                p = 0;
              }
              line += p ? white : black;
            }
            for (r = 0; r < cellSize; r += 1) {
              ascii += line + "\n";
            }
          }
          return ascii.substring(0, ascii.length - 1);
        };
        _this.renderTo2dContext = function(context, cellSize) {
          cellSize = cellSize || 2;
          var length = _this.getModuleCount();
          for (var row = 0; row < length; row++) {
            for (var col = 0; col < length; col++) {
              context.fillStyle = _this.isDark(row, col) ? "black" : "white";
              context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
            }
          }
        };
        return _this;
      }, "qrcode");
      qrcode3.stringToBytesFuncs = {
        "default": /* @__PURE__ */ __name(function(s) {
          var bytes = [];
          for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            bytes.push(c & 255);
          }
          return bytes;
        }, "default")
      };
      qrcode3.stringToBytes = qrcode3.stringToBytesFuncs["default"];
      qrcode3.createStringToBytes = function(unicodeData, numChars) {
        var unicodeMap = (function() {
          var bin = base64DecodeInputStream(unicodeData);
          var read = /* @__PURE__ */ __name(function() {
            var b = bin.read();
            if (b == -1) throw "eof";
            return b;
          }, "read");
          var count = 0;
          var unicodeMap2 = {};
          while (true) {
            var b0 = bin.read();
            if (b0 == -1) break;
            var b1 = read();
            var b2 = read();
            var b3 = read();
            var k = String.fromCharCode(b0 << 8 | b1);
            var v = b2 << 8 | b3;
            unicodeMap2[k] = v;
            count += 1;
          }
          if (count != numChars) {
            throw count + " != " + numChars;
          }
          return unicodeMap2;
        })();
        var unknownChar = "?".charCodeAt(0);
        return function(s) {
          var bytes = [];
          for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            if (c < 128) {
              bytes.push(c);
            } else {
              var b = unicodeMap[s.charAt(i)];
              if (typeof b == "number") {
                if ((b & 255) == b) {
                  bytes.push(b);
                } else {
                  bytes.push(b >>> 8);
                  bytes.push(b & 255);
                }
              } else {
                bytes.push(unknownChar);
              }
            }
          }
          return bytes;
        };
      };
      var QRMode = {
        MODE_NUMBER: 1 << 0,
        MODE_ALPHA_NUM: 1 << 1,
        MODE_8BIT_BYTE: 1 << 2,
        MODE_KANJI: 1 << 3
      };
      var QRErrorCorrectionLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
      };
      var QRMaskPattern = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      var QRUtil = (function() {
        var PATTERN_POSITION_TABLE = [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170]
        ];
        var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
        var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
        var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
        var _this = {};
        var getBCHDigit = /* @__PURE__ */ __name(function(data) {
          var digit = 0;
          while (data != 0) {
            digit += 1;
            data >>>= 1;
          }
          return digit;
        }, "getBCHDigit");
        _this.getBCHTypeInfo = function(data) {
          var d = data << 10;
          while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
            d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
          }
          return (data << 10 | d) ^ G15_MASK;
        };
        _this.getBCHTypeNumber = function(data) {
          var d = data << 12;
          while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
            d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
          }
          return data << 12 | d;
        };
        _this.getPatternPosition = function(typeNumber) {
          return PATTERN_POSITION_TABLE[typeNumber - 1];
        };
        _this.getMaskFunction = function(maskPattern) {
          switch (maskPattern) {
            case QRMaskPattern.PATTERN000:
              return function(i, j) {
                return (i + j) % 2 == 0;
              };
            case QRMaskPattern.PATTERN001:
              return function(i, j) {
                return i % 2 == 0;
              };
            case QRMaskPattern.PATTERN010:
              return function(i, j) {
                return j % 3 == 0;
              };
            case QRMaskPattern.PATTERN011:
              return function(i, j) {
                return (i + j) % 3 == 0;
              };
            case QRMaskPattern.PATTERN100:
              return function(i, j) {
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
              };
            case QRMaskPattern.PATTERN101:
              return function(i, j) {
                return i * j % 2 + i * j % 3 == 0;
              };
            case QRMaskPattern.PATTERN110:
              return function(i, j) {
                return (i * j % 2 + i * j % 3) % 2 == 0;
              };
            case QRMaskPattern.PATTERN111:
              return function(i, j) {
                return (i * j % 3 + (i + j) % 2) % 2 == 0;
              };
            default:
              throw "bad maskPattern:" + maskPattern;
          }
        };
        _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
          var a = qrPolynomial([1], 0);
          for (var i = 0; i < errorCorrectLength; i += 1) {
            a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
          }
          return a;
        };
        _this.getLengthInBits = function(mode, type) {
          if (1 <= type && type < 10) {
            switch (mode) {
              case QRMode.MODE_NUMBER:
                return 10;
              case QRMode.MODE_ALPHA_NUM:
                return 9;
              case QRMode.MODE_8BIT_BYTE:
                return 8;
              case QRMode.MODE_KANJI:
                return 8;
              default:
                throw "mode:" + mode;
            }
          } else if (type < 27) {
            switch (mode) {
              case QRMode.MODE_NUMBER:
                return 12;
              case QRMode.MODE_ALPHA_NUM:
                return 11;
              case QRMode.MODE_8BIT_BYTE:
                return 16;
              case QRMode.MODE_KANJI:
                return 10;
              default:
                throw "mode:" + mode;
            }
          } else if (type < 41) {
            switch (mode) {
              case QRMode.MODE_NUMBER:
                return 14;
              case QRMode.MODE_ALPHA_NUM:
                return 13;
              case QRMode.MODE_8BIT_BYTE:
                return 16;
              case QRMode.MODE_KANJI:
                return 12;
              default:
                throw "mode:" + mode;
            }
          } else {
            throw "type:" + type;
          }
        };
        _this.getLostPoint = function(qrcode4) {
          var moduleCount = qrcode4.getModuleCount();
          var lostPoint = 0;
          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount; col += 1) {
              var sameCount = 0;
              var dark = qrcode4.isDark(row, col);
              for (var r = -1; r <= 1; r += 1) {
                if (row + r < 0 || moduleCount <= row + r) {
                  continue;
                }
                for (var c = -1; c <= 1; c += 1) {
                  if (col + c < 0 || moduleCount <= col + c) {
                    continue;
                  }
                  if (r == 0 && c == 0) {
                    continue;
                  }
                  if (dark == qrcode4.isDark(row + r, col + c)) {
                    sameCount += 1;
                  }
                }
              }
              if (sameCount > 5) {
                lostPoint += 3 + sameCount - 5;
              }
            }
          }
          ;
          for (var row = 0; row < moduleCount - 1; row += 1) {
            for (var col = 0; col < moduleCount - 1; col += 1) {
              var count = 0;
              if (qrcode4.isDark(row, col)) count += 1;
              if (qrcode4.isDark(row + 1, col)) count += 1;
              if (qrcode4.isDark(row, col + 1)) count += 1;
              if (qrcode4.isDark(row + 1, col + 1)) count += 1;
              if (count == 0 || count == 4) {
                lostPoint += 3;
              }
            }
          }
          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount - 6; col += 1) {
              if (qrcode4.isDark(row, col) && !qrcode4.isDark(row, col + 1) && qrcode4.isDark(row, col + 2) && qrcode4.isDark(row, col + 3) && qrcode4.isDark(row, col + 4) && !qrcode4.isDark(row, col + 5) && qrcode4.isDark(row, col + 6)) {
                lostPoint += 40;
              }
            }
          }
          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount - 6; row += 1) {
              if (qrcode4.isDark(row, col) && !qrcode4.isDark(row + 1, col) && qrcode4.isDark(row + 2, col) && qrcode4.isDark(row + 3, col) && qrcode4.isDark(row + 4, col) && !qrcode4.isDark(row + 5, col) && qrcode4.isDark(row + 6, col)) {
                lostPoint += 40;
              }
            }
          }
          var darkCount = 0;
          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount; row += 1) {
              if (qrcode4.isDark(row, col)) {
                darkCount += 1;
              }
            }
          }
          var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
          lostPoint += ratio * 10;
          return lostPoint;
        };
        return _this;
      })();
      var QRMath = (function() {
        var EXP_TABLE = new Array(256);
        var LOG_TABLE = new Array(256);
        for (var i = 0; i < 8; i += 1) {
          EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i += 1) {
          EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i += 1) {
          LOG_TABLE[EXP_TABLE[i]] = i;
        }
        var _this = {};
        _this.glog = function(n) {
          if (n < 1) {
            throw "glog(" + n + ")";
          }
          return LOG_TABLE[n];
        };
        _this.gexp = function(n) {
          while (n < 0) {
            n += 255;
          }
          while (n >= 256) {
            n -= 255;
          }
          return EXP_TABLE[n];
        };
        return _this;
      })();
      function qrPolynomial(num, shift) {
        if (typeof num.length == "undefined") {
          throw num.length + "/" + shift;
        }
        var _num = (function() {
          var offset = 0;
          while (offset < num.length && num[offset] == 0) {
            offset += 1;
          }
          var _num2 = new Array(num.length - offset + shift);
          for (var i = 0; i < num.length - offset; i += 1) {
            _num2[i] = num[i + offset];
          }
          return _num2;
        })();
        var _this = {};
        _this.getAt = function(index) {
          return _num[index];
        };
        _this.getLength = function() {
          return _num.length;
        };
        _this.multiply = function(e) {
          var num2 = new Array(_this.getLength() + e.getLength() - 1);
          for (var i = 0; i < _this.getLength(); i += 1) {
            for (var j = 0; j < e.getLength(); j += 1) {
              num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
            }
          }
          return qrPolynomial(num2, 0);
        };
        _this.mod = function(e) {
          if (_this.getLength() - e.getLength() < 0) {
            return _this;
          }
          var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
          var num2 = new Array(_this.getLength());
          for (var i = 0; i < _this.getLength(); i += 1) {
            num2[i] = _this.getAt(i);
          }
          for (var i = 0; i < e.getLength(); i += 1) {
            num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
          }
          return qrPolynomial(num2, 0).mod(e);
        };
        return _this;
      }
      __name(qrPolynomial, "qrPolynomial");
      ;
      var QRRSBlock = (function() {
        var RS_BLOCK_TABLE = [
          // L
          // M
          // Q
          // H
          // 1
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],
          // 2
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],
          // 3
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],
          // 4
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],
          // 5
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],
          // 6
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],
          // 7
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],
          // 8
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],
          // 9
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],
          // 10
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],
          // 11
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],
          // 12
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],
          // 13
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],
          // 14
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],
          // 15
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12, 7, 37, 13],
          // 16
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],
          // 17
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],
          // 18
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],
          // 19
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],
          // 20
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],
          // 21
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],
          // 22
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],
          // 23
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],
          // 24
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],
          // 25
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],
          // 26
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],
          // 27
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],
          // 28
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],
          // 29
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],
          // 30
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],
          // 31
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],
          // 32
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],
          // 33
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],
          // 34
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],
          // 35
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],
          // 36
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],
          // 37
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],
          // 38
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],
          // 39
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],
          // 40
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16]
        ];
        var qrRSBlock = /* @__PURE__ */ __name(function(totalCount, dataCount) {
          var _this2 = {};
          _this2.totalCount = totalCount;
          _this2.dataCount = dataCount;
          return _this2;
        }, "qrRSBlock");
        var _this = {};
        var getRsBlockTable = /* @__PURE__ */ __name(function(typeNumber, errorCorrectionLevel) {
          switch (errorCorrectionLevel) {
            case QRErrorCorrectionLevel.L:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
            case QRErrorCorrectionLevel.M:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
            case QRErrorCorrectionLevel.Q:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
            case QRErrorCorrectionLevel.H:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
            default:
              return void 0;
          }
        }, "getRsBlockTable");
        _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
          var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
          if (typeof rsBlock == "undefined") {
            throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
          }
          var length = rsBlock.length / 3;
          var list = [];
          for (var i = 0; i < length; i += 1) {
            var count = rsBlock[i * 3 + 0];
            var totalCount = rsBlock[i * 3 + 1];
            var dataCount = rsBlock[i * 3 + 2];
            for (var j = 0; j < count; j += 1) {
              list.push(qrRSBlock(totalCount, dataCount));
            }
          }
          return list;
        };
        return _this;
      })();
      var qrBitBuffer = /* @__PURE__ */ __name(function() {
        var _buffer = [];
        var _length = 0;
        var _this = {};
        _this.getBuffer = function() {
          return _buffer;
        };
        _this.getAt = function(index) {
          var bufIndex = Math.floor(index / 8);
          return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
        };
        _this.put = function(num, length) {
          for (var i = 0; i < length; i += 1) {
            _this.putBit((num >>> length - i - 1 & 1) == 1);
          }
        };
        _this.getLengthInBits = function() {
          return _length;
        };
        _this.putBit = function(bit) {
          var bufIndex = Math.floor(_length / 8);
          if (_buffer.length <= bufIndex) {
            _buffer.push(0);
          }
          if (bit) {
            _buffer[bufIndex] |= 128 >>> _length % 8;
          }
          _length += 1;
        };
        return _this;
      }, "qrBitBuffer");
      var qrNumber = /* @__PURE__ */ __name(function(data) {
        var _mode = QRMode.MODE_NUMBER;
        var _data = data;
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return _data.length;
        };
        _this.write = function(buffer) {
          var data2 = _data;
          var i = 0;
          while (i + 2 < data2.length) {
            buffer.put(strToNum(data2.substring(i, i + 3)), 10);
            i += 3;
          }
          if (i < data2.length) {
            if (data2.length - i == 1) {
              buffer.put(strToNum(data2.substring(i, i + 1)), 4);
            } else if (data2.length - i == 2) {
              buffer.put(strToNum(data2.substring(i, i + 2)), 7);
            }
          }
        };
        var strToNum = /* @__PURE__ */ __name(function(s) {
          var num = 0;
          for (var i = 0; i < s.length; i += 1) {
            num = num * 10 + chatToNum(s.charAt(i));
          }
          return num;
        }, "strToNum");
        var chatToNum = /* @__PURE__ */ __name(function(c) {
          if ("0" <= c && c <= "9") {
            return c.charCodeAt(0) - "0".charCodeAt(0);
          }
          throw "illegal char :" + c;
        }, "chatToNum");
        return _this;
      }, "qrNumber");
      var qrAlphaNum = /* @__PURE__ */ __name(function(data) {
        var _mode = QRMode.MODE_ALPHA_NUM;
        var _data = data;
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return _data.length;
        };
        _this.write = function(buffer) {
          var s = _data;
          var i = 0;
          while (i + 1 < s.length) {
            buffer.put(
              getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)),
              11
            );
            i += 2;
          }
          if (i < s.length) {
            buffer.put(getCode(s.charAt(i)), 6);
          }
        };
        var getCode = /* @__PURE__ */ __name(function(c) {
          if ("0" <= c && c <= "9") {
            return c.charCodeAt(0) - "0".charCodeAt(0);
          } else if ("A" <= c && c <= "Z") {
            return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
          } else {
            switch (c) {
              case " ":
                return 36;
              case "$":
                return 37;
              case "%":
                return 38;
              case "*":
                return 39;
              case "+":
                return 40;
              case "-":
                return 41;
              case ".":
                return 42;
              case "/":
                return 43;
              case ":":
                return 44;
              default:
                throw "illegal char :" + c;
            }
          }
        }, "getCode");
        return _this;
      }, "qrAlphaNum");
      var qr8BitByte = /* @__PURE__ */ __name(function(data) {
        var _mode = QRMode.MODE_8BIT_BYTE;
        var _data = data;
        var _bytes = qrcode3.stringToBytes(data);
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return _bytes.length;
        };
        _this.write = function(buffer) {
          for (var i = 0; i < _bytes.length; i += 1) {
            buffer.put(_bytes[i], 8);
          }
        };
        return _this;
      }, "qr8BitByte");
      var qrKanji = /* @__PURE__ */ __name(function(data) {
        var _mode = QRMode.MODE_KANJI;
        var _data = data;
        var stringToBytes = qrcode3.stringToBytesFuncs["SJIS"];
        if (!stringToBytes) {
          throw "sjis not supported.";
        }
        !(function(c, code) {
          var test = stringToBytes(c);
          if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
            throw "sjis not supported.";
          }
        })("\u53CB", 38726);
        var _bytes = stringToBytes(data);
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return ~~(_bytes.length / 2);
        };
        _this.write = function(buffer) {
          var data2 = _bytes;
          var i = 0;
          while (i + 1 < data2.length) {
            var c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
            if (33088 <= c && c <= 40956) {
              c -= 33088;
            } else if (57408 <= c && c <= 60351) {
              c -= 49472;
            } else {
              throw "illegal char at " + (i + 1) + "/" + c;
            }
            c = (c >>> 8 & 255) * 192 + (c & 255);
            buffer.put(c, 13);
            i += 2;
          }
          if (i < data2.length) {
            throw "illegal char at " + (i + 1);
          }
        };
        return _this;
      }, "qrKanji");
      var byteArrayOutputStream = /* @__PURE__ */ __name(function() {
        var _bytes = [];
        var _this = {};
        _this.writeByte = function(b) {
          _bytes.push(b & 255);
        };
        _this.writeShort = function(i) {
          _this.writeByte(i);
          _this.writeByte(i >>> 8);
        };
        _this.writeBytes = function(b, off, len) {
          off = off || 0;
          len = len || b.length;
          for (var i = 0; i < len; i += 1) {
            _this.writeByte(b[i + off]);
          }
        };
        _this.writeString = function(s) {
          for (var i = 0; i < s.length; i += 1) {
            _this.writeByte(s.charCodeAt(i));
          }
        };
        _this.toByteArray = function() {
          return _bytes;
        };
        _this.toString = function() {
          var s = "";
          s += "[";
          for (var i = 0; i < _bytes.length; i += 1) {
            if (i > 0) {
              s += ",";
            }
            s += _bytes[i];
          }
          s += "]";
          return s;
        };
        return _this;
      }, "byteArrayOutputStream");
      var base64EncodeOutputStream = /* @__PURE__ */ __name(function() {
        var _buffer = 0;
        var _buflen = 0;
        var _length = 0;
        var _base64 = "";
        var _this = {};
        var writeEncoded = /* @__PURE__ */ __name(function(b) {
          _base64 += String.fromCharCode(encode(b & 63));
        }, "writeEncoded");
        var encode = /* @__PURE__ */ __name(function(n) {
          if (n < 0) {
          } else if (n < 26) {
            return 65 + n;
          } else if (n < 52) {
            return 97 + (n - 26);
          } else if (n < 62) {
            return 48 + (n - 52);
          } else if (n == 62) {
            return 43;
          } else if (n == 63) {
            return 47;
          }
          throw "n:" + n;
        }, "encode");
        _this.writeByte = function(n) {
          _buffer = _buffer << 8 | n & 255;
          _buflen += 8;
          _length += 1;
          while (_buflen >= 6) {
            writeEncoded(_buffer >>> _buflen - 6);
            _buflen -= 6;
          }
        };
        _this.flush = function() {
          if (_buflen > 0) {
            writeEncoded(_buffer << 6 - _buflen);
            _buffer = 0;
            _buflen = 0;
          }
          if (_length % 3 != 0) {
            var padlen = 3 - _length % 3;
            for (var i = 0; i < padlen; i += 1) {
              _base64 += "=";
            }
          }
        };
        _this.toString = function() {
          return _base64;
        };
        return _this;
      }, "base64EncodeOutputStream");
      var base64DecodeInputStream = /* @__PURE__ */ __name(function(str) {
        var _str = str;
        var _pos = 0;
        var _buffer = 0;
        var _buflen = 0;
        var _this = {};
        _this.read = function() {
          while (_buflen < 8) {
            if (_pos >= _str.length) {
              if (_buflen == 0) {
                return -1;
              }
              throw "unexpected end of file./" + _buflen;
            }
            var c = _str.charAt(_pos);
            _pos += 1;
            if (c == "=") {
              _buflen = 0;
              return -1;
            } else if (c.match(/^\s$/)) {
              continue;
            }
            _buffer = _buffer << 6 | decode(c.charCodeAt(0));
            _buflen += 6;
          }
          var n = _buffer >>> _buflen - 8 & 255;
          _buflen -= 8;
          return n;
        };
        var decode = /* @__PURE__ */ __name(function(c) {
          if (65 <= c && c <= 90) {
            return c - 65;
          } else if (97 <= c && c <= 122) {
            return c - 97 + 26;
          } else if (48 <= c && c <= 57) {
            return c - 48 + 52;
          } else if (c == 43) {
            return 62;
          } else if (c == 47) {
            return 63;
          } else {
            throw "c:" + c;
          }
        }, "decode");
        return _this;
      }, "base64DecodeInputStream");
      var gifImage = /* @__PURE__ */ __name(function(width, height) {
        var _width = width;
        var _height = height;
        var _data = new Array(width * height);
        var _this = {};
        _this.setPixel = function(x, y, pixel) {
          _data[y * _width + x] = pixel;
        };
        _this.write = function(out) {
          out.writeString("GIF87a");
          out.writeShort(_width);
          out.writeShort(_height);
          out.writeByte(128);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(255);
          out.writeByte(255);
          out.writeByte(255);
          out.writeString(",");
          out.writeShort(0);
          out.writeShort(0);
          out.writeShort(_width);
          out.writeShort(_height);
          out.writeByte(0);
          var lzwMinCodeSize = 2;
          var raster = getLZWRaster(lzwMinCodeSize);
          out.writeByte(lzwMinCodeSize);
          var offset = 0;
          while (raster.length - offset > 255) {
            out.writeByte(255);
            out.writeBytes(raster, offset, 255);
            offset += 255;
          }
          out.writeByte(raster.length - offset);
          out.writeBytes(raster, offset, raster.length - offset);
          out.writeByte(0);
          out.writeString(";");
        };
        var bitOutputStream = /* @__PURE__ */ __name(function(out) {
          var _out = out;
          var _bitLength = 0;
          var _bitBuffer = 0;
          var _this2 = {};
          _this2.write = function(data, length) {
            if (data >>> length != 0) {
              throw "length over";
            }
            while (_bitLength + length >= 8) {
              _out.writeByte(255 & (data << _bitLength | _bitBuffer));
              length -= 8 - _bitLength;
              data >>>= 8 - _bitLength;
              _bitBuffer = 0;
              _bitLength = 0;
            }
            _bitBuffer = data << _bitLength | _bitBuffer;
            _bitLength = _bitLength + length;
          };
          _this2.flush = function() {
            if (_bitLength > 0) {
              _out.writeByte(_bitBuffer);
            }
          };
          return _this2;
        }, "bitOutputStream");
        var getLZWRaster = /* @__PURE__ */ __name(function(lzwMinCodeSize) {
          var clearCode = 1 << lzwMinCodeSize;
          var endCode = (1 << lzwMinCodeSize) + 1;
          var bitLength = lzwMinCodeSize + 1;
          var table = lzwTable();
          for (var i = 0; i < clearCode; i += 1) {
            table.add(String.fromCharCode(i));
          }
          table.add(String.fromCharCode(clearCode));
          table.add(String.fromCharCode(endCode));
          var byteOut = byteArrayOutputStream();
          var bitOut = bitOutputStream(byteOut);
          bitOut.write(clearCode, bitLength);
          var dataIndex = 0;
          var s = String.fromCharCode(_data[dataIndex]);
          dataIndex += 1;
          while (dataIndex < _data.length) {
            var c = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;
            if (table.contains(s + c)) {
              s = s + c;
            } else {
              bitOut.write(table.indexOf(s), bitLength);
              if (table.size() < 4095) {
                if (table.size() == 1 << bitLength) {
                  bitLength += 1;
                }
                table.add(s + c);
              }
              s = c;
            }
          }
          bitOut.write(table.indexOf(s), bitLength);
          bitOut.write(endCode, bitLength);
          bitOut.flush();
          return byteOut.toByteArray();
        }, "getLZWRaster");
        var lzwTable = /* @__PURE__ */ __name(function() {
          var _map = {};
          var _size = 0;
          var _this2 = {};
          _this2.add = function(key) {
            if (_this2.contains(key)) {
              throw "dup key:" + key;
            }
            _map[key] = _size;
            _size += 1;
          };
          _this2.size = function() {
            return _size;
          };
          _this2.indexOf = function(key) {
            return _map[key];
          };
          _this2.contains = function(key) {
            return typeof _map[key] != "undefined";
          };
          return _this2;
        }, "lzwTable");
        return _this;
      }, "gifImage");
      var createDataURL = /* @__PURE__ */ __name(function(width, height, getPixel) {
        var gif = gifImage(width, height);
        for (var y = 0; y < height; y += 1) {
          for (var x = 0; x < width; x += 1) {
            gif.setPixel(x, y, getPixel(x, y));
          }
        }
        var b = byteArrayOutputStream();
        gif.write(b);
        var base64 = base64EncodeOutputStream();
        var bytes = b.toByteArray();
        for (var i = 0; i < bytes.length; i += 1) {
          base64.writeByte(bytes[i]);
        }
        base64.flush();
        return "data:image/gif;base64," + base64;
      }, "createDataURL");
      return qrcode3;
    })();
    !(function() {
      qrcode2.stringToBytesFuncs["UTF-8"] = function(s) {
        function toUTF8Array(str) {
          var utf8 = [];
          for (var i = 0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 128) utf8.push(charcode);
            else if (charcode < 2048) {
              utf8.push(
                192 | charcode >> 6,
                128 | charcode & 63
              );
            } else if (charcode < 55296 || charcode >= 57344) {
              utf8.push(
                224 | charcode >> 12,
                128 | charcode >> 6 & 63,
                128 | charcode & 63
              );
            } else {
              i++;
              charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
              utf8.push(
                240 | charcode >> 18,
                128 | charcode >> 12 & 63,
                128 | charcode >> 6 & 63,
                128 | charcode & 63
              );
            }
          }
          return utf8;
        }
        __name(toUTF8Array, "toUTF8Array");
        return toUTF8Array(s);
      };
    })();
    (function(factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      }
    })(function() {
      return qrcode2;
    });
  }
});

// src/rounds.js
var SUFFIX = "\n\nKorzystaj wy\u0142\u0105cznie z podanych danych. Poka\u017C obliczenia krok po kroku. Je\u015Bli czego\u015B brakuje, napisz BRAK DANYCH \u2013 nie zgaduj. Odpowiedz po polsku, zwi\u0119\u017Ale.";
function tableText(t) {
  return [t.headers.join(" | "), ...t.rows.map((r) => r.join(" | "))].join("\n");
}
__name(tableText, "tableText");
var R = [];
R.push({
  id: 0,
  code: "R0",
  kind: "warmup",
  minutes: 3,
  title: "Start i test po\u0142\u0105czenia",
  context: "Wpiszcie nazw\u0119 zespo\u0142u (pojawi si\u0119 na ekranie) i odpowiedzcie na jedno pytanie. Ta runda nie jest punktowana.",
  question: "Jak cz\u0119sto Wasz zesp\xF3\u0142 korzysta z AI w pracy?",
  options: [
    { k: "A", t: "Codziennie" },
    { k: "B", t: "Kilka razy w tygodniu" },
    { k: "C", t: "Sporadycznie" },
    { k: "D", t: "Jeszcze wcale" }
  ]
});
R.push({
  id: 1,
  code: "R1",
  kind: "decision",
  minutes: 5,
  title: "Metr czy kr\u0105\u017Cek?",
  topic: "Jako\u015B\u0107 danych i jednostki",
  context: "Hurtownia potrzebuje 1 000 m przewodu instalacyjnego 3\xD72,5 mm\xB2. Trzy oferty (dane szkoleniowe):",
  table: { headers: ["Dostawca", "Cena netto", "Jednostka", "Rabat", "Transport"], rows: [
    ["Alfa", "189,00 PLN", "kr\u0105\u017Cek 100 m", "10%", "w cenie"],
    ["Beta", "1,82 PLN", "metr (min. 500 m)", "\u2014", "w cenie"],
    ["Gamma", "92,00 PLN", "kr\u0105\u017Cek 50 m", "5%", "40 PLN / zam\xF3wienie"]
  ] },
  question: "Kt\xF3ra oferta daje najni\u017Cszy koszt 1 000 m z transportem?",
  options: [
    { k: "A", t: "Alfa" },
    { k: "B", t: "Beta" },
    { k: "C", t: "Gamma" },
    { k: "D", t: "Nie da si\u0119 por\xF3wna\u0107 \u2013 brak danych" }
  ],
  numLabel: "Koszt 1 metra w najlepszej ofercie",
  numUnit: "PLN/m"
});
R.push({
  id: 2,
  code: "R2",
  kind: "decision",
  minutes: 5,
  title: "Rabat zjadany przez logistyk\u0119",
  topic: "Bezpo\u015Brednio, hub czy model mieszany",
  context: "Wsp\xF3lny zakup kwartalny 6 hurtowni u 3 dostawc\xF3w. Hub daje dodatkowy rabat 2% (4 000 PLN). Wszystkie warianty dotrzymuj\u0105 termin\xF3w. Koszt po stronie kupuj\u0105cych, PLN netto:",
  table: { headers: ["Pozycja", "Bezpo\u015Brednio", "Przez hub", "Mieszany"], rows: [
    ["Zakup po rabacie", "200 000", "196 000", "198 200"],
    ["Transport od dostawc\xF3w", "5 200", "2 900", "3 900"],
    ["Prze\u0142adunek i przepakowanie", "0", "2 600", "900"],
    ["Rozw\xF3z z hubu", "0", "4 100", "1 500"],
    ["Utrzymanie zapasu", "600", "1 300", "900"]
  ] },
  question: "Kt\xF3ry wariant jest najta\u0144szy \u0142\u0105cznie?",
  options: [
    { k: "A", t: "Dostawa bezpo\u015Brednia" },
    { k: "B", t: "Przez hub" },
    { k: "C", t: "Model mieszany" },
    { k: "D", t: "Nie da si\u0119 oceni\u0107 bez danych dostawcy" }
  ],
  numLabel: "Koszt hubu minus koszt dostawy bezpo\u015Bredniej (z minusem, je\u015Bli hub ta\u0144szy)",
  numUnit: "PLN"
});
R.push({
  id: 3,
  code: "R3",
  kind: "decision",
  minutes: 5,
  title: "Kto naprawd\u0119 kosztuje?",
  topic: "Koszt obs\u0142ugi zam\xF3wie\u0144 (cost-to-serve)",
  context: "Dwie hurtownie, ten sam wolumen zakupu w kwartale: 250 000 PLN. Po\u0142udnie ma wy\u017Cszy pr\xF3g rabatu (3% zamiast 2%). Stawki dzia\u0142a\u0144 dostawcy: obs\u0142uga zam\xF3wienia 40 PLN, kompletacja 3 PLN/lini\u0119, wysy\u0142ka 180 PLN, dop\u0142ata za zam\xF3wienie pilne 220 PLN, korekta 70 PLN.",
  table: { headers: ["Czynnik (kwarta\u0142)", "P\xF3\u0142noc", "Po\u0142udnie"], rows: [
    ["Zam\xF3wienia", "10", "48"],
    ["Linie", "520", "1 150"],
    ["Wysy\u0142ki", "10", "44"],
    ["Zam\xF3wienia pilne", "1", "14"],
    ["Korekty", "2", "11"]
  ] },
  question: "Kt\xF3ra hurtownia jest dro\u017Csza w obs\u0142udze dla dostawcy?",
  options: [
    { k: "A", t: "P\xF3\u0142noc" },
    { k: "B", t: "Po\u0142udnie" },
    { k: "C", t: "Koszt taki sam \u2013 ten sam wolumen" },
    { k: "D", t: "Nie da si\u0119 oceni\u0107" }
  ],
  numLabel: "Kwartalny koszt obs\u0142ugi dro\u017Cszej hurtowni",
  numUnit: "PLN"
});
R.push({
  id: 4,
  code: "R4",
  kind: "decision",
  minutes: 5,
  title: "Czy AI ma racj\u0119?",
  topic: "Weryfikacja odpowiedzi i \u017Ar\xF3de\u0142",
  context: "Kupiec zapyta\u0142 asystenta AI: \u201EIle wa\u017Cy karton wy\u0142\u0105cznik\xF3w nadpr\u0105dowych B16 1P?\u201D. Asystent mia\u0142 dost\u0119p do tej karty produktu:",
  table: { headers: ["Wiersz", "Pole", "Warto\u015B\u0107"], rows: [
    ["1", "Produkt", "Wy\u0142\u0105cznik nadpr\u0105dowy B16 1P (indeks szkoleniowy WN-B16-01)"],
    ["2", "Jednostka zam\xF3wienia", "karton"],
    ["3", "Sztuk w kartonie", "12"],
    ["4", "Masa sztuki", "0,11 kg"],
    ["5", "Wymiary kartonu", "30 \xD7 20 \xD7 10 cm"],
    ["6", "Masa kartonu brutto", "\u2014 (pole puste)"]
  ] },
  answers: [
    { k: "A", t: "\u201EKarton wa\u017Cy 1,32 kg.\u201D" },
    { k: "B", t: "\u201EWed\u0142ug karty produktu karton brutto wa\u017Cy 1,6 kg.\u201D" },
    { k: "C", t: "\u201EKarta podaje 12 szt. w kartonie (w. 3) i 0,11 kg/szt. (w. 4) \u2013 produkty wa\u017C\u0105 1,32 kg netto. Masy kartonu brutto karta nie zawiera (w. 6) \u2013 trzeba zapyta\u0107 dostawc\u0119.\u201D" }
  ],
  question: "Kt\xF3rej odpowiedzi mo\u017Cna zaufa\u0107 przy planowaniu transportu?",
  options: [
    { k: "A", t: "Odpowiedzi A" },
    { k: "B", t: "Odpowiedzi B" },
    { k: "C", t: "Odpowiedzi C" },
    { k: "D", t: "Wszystkie s\u0105 poprawne" }
  ],
  numLabel: "Masa netto produkt\xF3w w kartonie",
  numUnit: "kg"
});
R.push({
  id: 5,
  code: "R5",
  kind: "decision",
  minutes: 6,
  title: "Zdarzenie: niedob\xF3r wy\u0142\u0105cznik\xF3w",
  topic: "Ryzyko dostaw i przydzia\u0142 w niedoborze",
  context: "PILNE: dostawca mo\u017Ce wys\u0142a\u0107 w tym tygodniu tylko 4 000 szt. wy\u0142\u0105cznik\xF3w B16 1P. Zam\xF3wienia 6 hurtowni: 10 000 szt. H1 ma potwierdzone zam\xF3wienia projektowe.",
  table: { headers: ["Hurtownia", "Zam\xF3wienie (szt.)", "Sprzeda\u017C tyg. (szt.)", "Zapas dzi\u015B (szt.)"], rows: [
    ["H1", "1 800", "700", "300"],
    ["H2", "1 500", "500", "900"],
    ["H3", "1 200", "450", "200"],
    ["H4", "1 600", "600", "1 400"],
    ["H5", "3 000", "400", "2 000"],
    ["H6", "900", "350", "100"]
  ] },
  question: "Jak\u0105 zasad\u0119 przydzia\u0142u 4 000 szt. rekomendujecie?",
  options: [
    { k: "A", t: "Proporcjonalnie \u2013 ka\u017Cdy dostaje 40% zam\xF3wienia" },
    { k: "B", t: "Wed\u0142ug kolejno\u015Bci wp\u0142ywu zam\xF3wie\u0144" },
    { k: "C", t: "Najpierw pokrycie 2 tygodni sprzeda\u017Cy (2 \xD7 sprzeda\u017C \u2212 zapas, max. zam\xF3wienie), reszt\u0119 puli proporcjonalnie do sprzeda\u017Cy tyg." },
    { k: "D", t: "Pierwsze\u0144stwo dla najwi\u0119kszego zam\xF3wienia (H5)" }
  ],
  numLabel: "Ile sztuk dostaje H5 przy zasadzie C?",
  numUnit: "szt."
});
R.push({
  id: 6,
  code: "R6",
  kind: "decision",
  minutes: 6,
  title: "Rabat za przewidywalno\u015B\u0107",
  topic: "Wsp\xF3\u0142praca hurtownia \u2013 dostawca i mandat agenta AI",
  context: "Dane Po\u0142udnia z rundy 3 (koszt obs\u0142ugi 17 140 PLN/kwarta\u0142, zakupy 250 000 PLN). Dostawca i Po\u0142udnie rozwa\u017Caj\u0105 trzy regu\u0142y. Koszt przyj\u0119cia dostawy w hurtowni: 90 PLN. Koszt utrzymania zapasu: 20% rocznie. Stawki dzia\u0142a\u0144 dostawcy jak w rundzie 3.",
  table: { headers: ["Regu\u0142a", "Co si\u0119 zmienia"], rows: [
    ["A", "Dodatkowy rabat 1% (2 500 PLN) bez warunk\xF3w. Spos\xF3b zamawiania bez zmian."],
    ["B", "Okno zam\xF3wie\u0144 1\xD7 w tygodniu, pilne tylko z uzasadnieniem projektowym, rabat za przewidywalno\u015B\u0107 1% (2 500 PLN). Efekt: 13 zam\xF3wie\u0144, 1 000 linii, 13 wysy\u0142ek, 4 pilne, 4 korekty. \u015Aredni zapas Po\u0142udnia +20 000 PLN."],
    ["C", "Dop\u0142ata 300 PLN za ka\u017Cde zam\xF3wienie poni\u017Cej 3 000 PLN (20 takich w kwartale). Spos\xF3b zamawiania bez zmian."]
  ] },
  question: "Kt\xF3ra regu\u0142a daje korzy\u015B\u0107 OBU stronom?",
  options: [
    { k: "A", t: "Regu\u0142a A" },
    { k: "B", t: "Regu\u0142a B" },
    { k: "C", t: "Regu\u0142a C" },
    { k: "D", t: "\u017Badna" }
  ],
  numLabel: "\u0141\u0105czna korzy\u015B\u0107 \u0142a\u0144cucha przy tej regule (dostawca + hurtownia, kwarta\u0142)",
  numUnit: "PLN",
  extra: { label: "Czy agent AI m\xF3g\u0142by sam wynegocjowa\u0107 tak\u0105 regu\u0142\u0119?", options: [
    { k: "1", t: "Tak, sam" },
    { k: "2", t: "Proponuje \u2013 cz\u0142owiek zatwierdza" },
    { k: "3", t: "Tylko cz\u0142owiek" }
  ] }
});
R.push({
  id: 7,
  code: "R7",
  kind: "final",
  minutes: 4,
  title: "Co testujemy po warsztacie?",
  context: "Ostatni krok. Wybierzcie obszar i opiszcie jedn\u0105 rzecz, kt\xF3r\u0105 Wasze firmy mog\u0105 przetestowa\u0107 z partnerem w ci\u0105gu 30 dni. Bez nazw firm, cen i rabat\xF3w.",
  question: "Kt\xF3ry obszar wsp\xF3\u0142pracy chcecie usprawni\u0107 najpierw?",
  options: [
    { k: "A", t: "Dane o produktach i opakowaniach" },
    { k: "B", t: "Wymiana prognoz i planowanie" },
    { k: "C", t: "Okna dostaw i zasady zam\xF3wie\u0144 pilnych" },
    { k: "D", t: "Zasady na czas niedoboru" }
  ],
  noteLabel: "Jedna rzecz do przetestowania w 30 dni (max 140 znak\xF3w)"
});
var PROMPTS = {
  1: () => "Jeste\u015B analitykiem zakup\xF3w w hurtowni elektrycznej. Hurtownia potrzebuje 1 000 m przewodu 3\xD72,5 mm\xB2. Por\xF3wnaj trzy oferty:\n" + tableText(R[1].table) + "\n\nSprowad\u017A ka\u017Cd\u0105 ofert\u0119 do kosztu 1 m po rabacie i z transportem oraz policz koszt ca\u0142ych 1 000 m. Wska\u017C najta\u0144sz\u0105." + SUFFIX,
  2: () => "Jeste\u015B analitykiem logistyki. Por\xF3wnaj \u0142\u0105czny koszt trzech wariant\xF3w dostawy tego samego koszyka (koszt kupuj\u0105cych, PLN netto):\n" + tableText(R[2].table) + "\n\nPolicz sum\u0119 dla ka\u017Cdego wariantu, r\xF3\u017Cnic\u0119 hub minus bezpo\u015Brednio i wska\u017C najta\u0144szy. Oce\u0144, czy rabat w hubie pokrywa dodatkowe koszty." + SUFFIX,
  3: () => "Jeste\u015B kontrolerem koszt\xF3w dostawcy. Stawki dzia\u0142a\u0144: obs\u0142uga zam\xF3wienia 40 PLN, kompletacja 3 PLN/lini\u0119, wysy\u0142ka 180 PLN, dop\u0142ata za pilne 220 PLN, korekta 70 PLN. Obie hurtownie kupuj\u0105 za 250 000 PLN w kwartale. Dane:\n" + tableText(R[3].table) + "\n\nPolicz kwartalny koszt obs\u0142ugi ka\u017Cdej hurtowni i jako % warto\u015Bci zakup\xF3w. Wska\u017C, kt\xF3ra jest dro\u017Csza i dlaczego." + SUFFIX,
  4: () => "Jeste\u015B audytorem jako\u015Bci odpowiedzi AI. Karta produktu:\n" + tableText(R[4].table) + "\n\nPytanie kupca: \u201EIle wa\u017Cy karton wy\u0142\u0105cznik\xF3w?\u201D. Trzy odpowiedzi asystenta:\n" + R[4].answers.map((a) => a.k + ": " + a.t).join("\n") + "\n\nDla ka\u017Cdej odpowiedzi oce\u0144: zgodno\u015B\u0107 z kart\u0105, czy wskazuje \u017Ar\xF3d\u0142o (wiersz), czy dopisuje fakty spoza karty. Policz mas\u0119 netto produkt\xF3w w kartonie. Wska\u017C odpowied\u017A, kt\xF3rej mo\u017Cna zaufa\u0107 przy planowaniu transportu." + SUFFIX,
  5: () => "Jeste\u015B planist\u0105 dostaw u producenta. Masz tylko 4 000 szt. wy\u0142\u0105cznik\xF3w, a zam\xF3wienia 6 hurtowni to 10 000 szt. H1 ma potwierdzone zam\xF3wienia projektowe. Dane:\n" + tableText(R[5].table) + "\n\nPolicz przydzia\u0142 wed\u0142ug dw\xF3ch zasad: (A) proporcjonalnie do zam\xF3wie\u0144 \u2013 40% ka\u017Cdemu; (C) najpierw pokrycie 2 tygodni sprzeda\u017Cy: min(zam\xF3wienie, max(0, 2 \xD7 sprzeda\u017C tyg. \u2212 zapas)), a reszt\u0119 puli proporcjonalnie do sprzeda\u017Cy tygodniowej. Dla obu zasad poka\u017C, na ile tygodni sprzeda\u017Cy wystarczy zapas ka\u017Cdej hurtowni po dostawie. Kt\xF3ra zasada lepiej chroni obs\u0142ug\u0119 klient\xF3w i nie nagradza zawy\u017Cania zam\xF3wie\u0144?" + SUFFIX,
  6: () => "Jeste\u015B doradc\u0105 hurtowni i dostawcy. Hurtownia Po\u0142udnie kupuje za 250 000 PLN/kwarta\u0142. Obecnie: 48 zam\xF3wie\u0144, 1 150 linii, 44 wysy\u0142ki, 14 pilnych, 11 korekt. Stawki dostawcy: zam\xF3wienie 40 PLN, linia 3 PLN, wysy\u0142ka 180 PLN, pilne 220 PLN, korekta 70 PLN. Koszt przyj\u0119cia dostawy w hurtowni 90 PLN (jedna wysy\u0142ka = jedno przyj\u0119cie). Koszt zapasu 20% rocznie. Regu\u0142y:\n" + tableText(R[6].table) + "\n\nDla ka\u017Cdej regu\u0142y policz kwartalny wynik dostawcy, hurtowni i ca\u0142ego \u0142a\u0144cucha (suma). Pami\u0119taj: rabat i dop\u0142ata to przesuni\u0119cie pieni\u0119dzy mi\u0119dzy stronami, nie oszcz\u0119dno\u015B\u0107 \u0142a\u0144cucha. Wska\u017C regu\u0142\u0119 korzystn\u0105 dla obu stron." + SUFFIX
};
for (const k in PROMPTS) R[k].prompt = PROMPTS[k]();
var KEY = {
  1: { answer: "A", num: 1.7, tol: 0.02, explain: "Alfa: 189 \xD7 0,9 / 100 = 1,70 PLN/m \u2192 1 701 PLN. Gamma: 92 \xD7 0,95 / 50 = 1,75 PLN/m + 40 PLN transportu \u2192 1 788 PLN. Beta: 1 820 PLN. Najni\u017Csza cena \u201Ena etykiecie\u201D (92 PLN) i najmniejsza liczba (1,82) to pu\u0142apki jednostek." },
  2: { answer: "C", num: 1100, tol: 0.05, explain: "Bezpo\u015Brednio 205 800 \xB7 Hub 206 900 \xB7 Mieszany 205 400 PLN. Rabat 4 000 PLN w hubie \u201Ezjadaj\u0105\u201D prze\u0142adunek, rozw\xF3z i zapas \u2013 hub jest dro\u017Cszy o 1 100 PLN. Model mieszany wygrywa o 400 PLN, przy tych za\u0142o\u017Ceniach. Pytanie otwarte: co na tym zyskuje lub traci dostawca?" },
  3: { answer: "B", num: 17140, tol: 0.05, explain: "P\xF3\u0142noc 4 120 PLN (1,6% warto\u015Bci) \xB7 Po\u0142udnie 17 140 PLN (6,9%). Ten sam wolumen, ponad 4\xD7 wy\u017Cszy koszt obs\u0142ugi \u2013 a Po\u0142udnie dostaje wy\u017Cszy rabat. Rabat nagradza wolumen, koszt tworzy spos\xF3b zamawiania." },
  4: { answer: "C", num: 1.32, tol: 0.02, explain: "A \u2013 liczba poprawna, ale to masa netto podana jako masa kartonu, bez \u017Ar\xF3d\u0142a. B \u2013 halucynacja: karta nie zawiera masy brutto. C \u2013 wskazuje wiersze i jawnie oznacza brak. Zasada: poka\u017C wiersz, oznacz brak, zapytaj w\u0142a\u015Bciw\u0105 osob\u0119." },
  5: { answer: "C", num: 200, tol: 0.05, explain: "Zasada A: H5 dostaje 1 200 szt. (zapas na 8 tygodni), a H6 tylko 360 szt. (1,3 tyg.) \u2013 ryzyko brak\xF3w u klient\xF3w. Zasada C: H1 1 450 \xB7 H2 350 \xB7 H3 925 \xB7 H4 300 \xB7 H5 200 \xB7 H6 775 \u2013 ka\u017Cdy ma co najmniej 2,5 tyg. pokrycia. Przydzia\u0142 proporcjonalny nagradza zawy\u017Canie zam\xF3wie\u0144 w niedoborze (efekt byczego bicza). Lekarstwo: wymiana danych o sprzeda\u017Cy i zapasie." },
  6: { answer: "B", num: 11910, tol: 0.05, explain: "Regu\u0142a B: koszt obs\u0142ugi 17 140 \u2192 7 020 PLN. Dostawca +7 620 PLN (po rabacie), Po\u0142udnie +4 290 PLN (rabat 2 500 + 31 przyj\u0119\u0107 mniej \xD7 90 \u2212 koszt zapasu 1 000). \u0141a\u0144cuch +11 910 PLN. Regu\u0142y A i C tylko przesuwaj\u0105 pieni\u0105dze mi\u0119dzy stronami (\u0142a\u0144cuch 0). Rabat to transfer, nie oszcz\u0119dno\u015B\u0107 \u0142a\u0144cucha." }
};
var ROUNDS = R;
var SCORING = { right: 10, wrong: -5, numBonus: 5 };

// src/pages.js
var CSS_BASE = String.raw`
:root{--navy:#111214;--navy2:#18191d;--gold:#d9a13b;--gold2:#f3d27a;--orange:#d9772e;--ok:#3cb371;--bad:#e05a4f;--txt:#f5f1e8;--mut:#a8a29a;--card:#202227;--in:#2a2c32;--line:#3b3e46;--deep:#0c0d0f;--grad:linear-gradient(90deg,#c9892a 0%,#f3d27a 45%,#d9772e 100%)}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:var(--navy);color:var(--txt)}
table{border-collapse:collapse;width:100%}th,td{border-bottom:1px solid var(--line);padding:.45em .5em;text-align:left;vertical-align:top}th{color:var(--gold2);font-weight:600}
.badge{display:inline-block;padding:.15em .6em;border-radius:99px;background:var(--grad);color:var(--navy);font-weight:700;font-size:.8em}
`;
var _a;
var PAGE_TEAM = String.raw`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Giełda decyzji ELPLUS</title><style>${""}` + CSS_BASE + String.raw(_a || (_a = __template([`
body{font-size:16px;padding-bottom:5rem}
header{position:sticky;top:0;background:var(--navy2);padding:.7rem 1rem;border-bottom:2px solid transparent;border-image:var(--grad) 1;z-index:5;display:flex;justify-content:space-between;align-items:center}
header b{color:var(--gold2)}#timer{font-variant-numeric:tabular-nums;font-weight:700;font-size:1.2rem}
main{padding:1rem;max-width:640px;margin:auto}
.card{background:var(--card);border-radius:14px;padding:1rem;margin-bottom:1rem}
h2{margin:.2rem 0 .4rem;font-size:1.25rem}.topic{color:var(--mut);font-size:.9rem}
.tbl{overflow-x:auto;font-size:.88rem;margin:.6rem 0}
.q{font-weight:700;font-size:1.08rem;margin:.8rem 0 .5rem}
.opt{display:block;width:100%;text-align:left;padding:.85rem;margin:.4rem 0;border-radius:12px;border:2px solid var(--line);background:var(--in);color:var(--txt);font-size:1rem}
.opt.sel{border-color:var(--gold);background:#3a2e17;box-shadow:inset 0 0 0 2px var(--gold)}.opt b{color:var(--gold2);margin-right:.4rem}
.seg{display:flex;gap:.5rem}.seg button{flex:1;padding:.8rem 0;border-radius:12px;border:2px solid var(--line);background:var(--in);color:var(--txt);font-size:1.15rem;font-weight:700}
.seg button.sel{border-color:var(--gold);background:var(--grad);color:#1a1206}
input,textarea{width:100%;padding:.8rem;border-radius:10px;border:2px solid var(--line);background:var(--deep);color:var(--txt);font-size:1.05rem}
label{display:block;margin:.9rem 0 .35rem;font-weight:600}
.hint{color:var(--mut);font-size:.85rem;margin-top:.3rem}
.ans{background:var(--in);border-left:4px solid var(--gold);padding:.6rem;margin:.4rem 0;border-radius:6px;font-size:.92rem}
.prompt{white-space:pre-wrap;font-size:.8rem;background:var(--deep);padding:.6rem;border-radius:8px;max-height:9rem;overflow:auto;color:#d8d2c6}
.row{display:flex;gap:.5rem;margin-top:.5rem}.btn{flex:1;padding:.85rem;border-radius:12px;border:0;font-weight:700;font-size:1rem;text-align:center;text-decoration:none}
.btn.gold{background:var(--grad);color:#1a1206}.btn.ghost{background:var(--line);color:var(--txt)}
#send{width:100%;margin-top:1.2rem;padding:1rem;font-size:1.15rem}
.ok{color:var(--ok)}.bad{color:var(--bad)}.big{font-size:2rem;font-weight:800}
.msg{padding:.7rem;border-radius:10px;margin-top:.8rem}.msg.ok{background:#1d3a28}.msg.err{background:#4a1f1d;color:#ffd7d3}
details summary{cursor:pointer;color:var(--gold2);font-weight:600}
</style></head><body>
<header><div><img src="/logo.png" alt="Baldor" style="height:22px;display:block;margin-bottom:3px"><b>Gie\u0142da decyzji ELPLUS</b><br><span id="team">Zesp\xF3\u0142 __G__</span></div><div id="timer"></div></header>
<main id="app"><div class="card">\u0141\u0105czenie\u2026</div></main>
<script>
var G=__G__, S=null, draft={}, sig="", offset=0;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;"}[c]})}
function fmt(n){return (n==null||n==="")?"\u2014":String(n).replace(".",",")}
function tbl(t){if(!t)return "";var h="<div class=tbl><table><tr>"+t.headers.map(function(x){return "<th>"+esc(x)+"</th>"}).join("")+"</tr>";
 t.rows.forEach(function(r){h+="<tr>"+r.map(function(x){return "<td>"+esc(x)+"</td>"}).join("")+"</tr>"});return h+"</table></div>"}
function roundHead(r){var h="<div class=card><span class=badge>"+esc(r.code)+"</span> <h2>"+esc(r.title)+"</h2>";
 if(r.topic)h+="<div class=topic>"+esc(r.topic)+"</div>";
 h+="<p>"+esc(r.context)+"</p>"+tbl(r.table);
 if(r.answers)r.answers.forEach(function(a){h+="<div class=ans><b>Odpowied\u017A "+a.k+":</b> "+esc(a.t)+"</div>"});
 return h+"</div>"}
function promptBox(r){if(!r.prompt)return "";
 return "<div class=card><details><summary>Prompt dla AI (dane s\u0105 ju\u017C w \u015Brodku)</summary><div class=prompt id=pr>"+esc(r.prompt)+"</div></details>"+
 "<div class=row><button class='btn gold' onclick='copyP()'>Kopiuj prompt</button><a class='btn ghost' href='https://chatgpt.com/' target='_blank' rel='noopener'>Otw\xF3rz ChatGPT</a></div>"+
 "<div class=hint>Rachmistrz sprawdza wynik AI kalkulatorem. Sceptyk pyta: sk\u0105d ta liczba?</div><div id=cpmsg class=hint></div></div>"}
function copyP(){var t=S.round.prompt;function done(){document.getElementById("cpmsg").textContent="Skopiowano. Wklej w ChatGPT."}
 if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(done,fallback)}else fallback();
 function fallback(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy");done()}catch(e){}document.body.removeChild(a)}}
function form(r){var m=S.mine||{};
 if(draft.rnd!==r.id){draft={rnd:r.id,choice:m.choice||null,num:m.num!=null?String(m.num).replace(".",","):"",tokens:m.tokens||null,note:m.note||"",extra:m.extra||null,name:""}}
 var h="<div class=card>";
 if(S.mine)h+="<div class='msg ok'>\u2713 Odpowied\u017A wys\u0142ana. Mo\u017Cecie j\u0105 poprawi\u0107 do zamkni\u0119cia rundy.</div>";
 if(r.kind==="warmup")h+="<label>Nazwa zespo\u0142u (max 24 znaki)</label><input id=name maxlength=24 value='"+esc(draft.name||(S.team&&S.team.indexOf("Zesp\xF3\u0142")!==0?S.team:""))+"' oninput='draft.name=this.value'>";
 h+="<div class=q>"+esc(r.question)+"</div>";
 r.options.forEach(function(o){h+="<button class='opt"+(draft.choice===o.k?" sel":"")+"' onclick="pick('choice','"+o.k+"')"><b>"+o.k+"</b>"+esc(o.t)+"</button>"});
 if(r.numLabel)h+="<label>"+esc(r.numLabel)+" ["+esc(r.numUnit)+"]</label><input id=num inputmode=decimal value='"+esc(draft.num)+"' oninput='draft.num=this.value' placeholder='np. 1234,5'><div class=hint>Trafienie z dok\u0142adno\u015Bci\u0105 \xB12\u20135% = +5 pkt.</div>";
 if(r.kind==="decision"){h+="<label>\u017Betony pewno\u015Bci</label><div class=seg>"+[1,2,3].map(function(t){return "<button class='"+(draft.tokens===t?"sel":"")+"' onclick='pick("tokens","+t+")'>"+t+"</button>"}).join("")+"</div><div class=hint>Trafienie: +10 \xD7 \u017Cetony. B\u0142\u0105d: \u22125 \xD7 \u017Cetony.</div>"}
 if(r.extra){h+="<label>"+esc(r.extra.label)+"</label>";r.extra.options.forEach(function(o){h+="<button class='opt"+(draft.extra===o.k?" sel":"")+"' onclick="pick('extra','"+o.k+"')"><b>"+o.k+"</b>"+esc(o.t)+"</button>"})}
 if(r.kind==="final")h+="<label>"+esc(r.noteLabel)+"</label><textarea id=note rows=3 maxlength=140 oninput='draft.note=this.value'>"+esc(draft.note)+"</textarea>";
 else if(r.kind==="decision")h+="<label>Uzasadnienie (opcjonalnie)</label><input id=note maxlength=100 value='"+esc(draft.note)+"' oninput='draft.note=this.value'>";
 h+="<button id=send class='btn gold' onclick='send()'>"+(S.mine?"Wy\u015Blij poprawk\u0119":"Wy\u015Blij odpowied\u017A")+"</button><div id=fmsg></div></div>";
 return h}
function pick(k,v){draft[k]=v;render(true)}
function send(){var b={g:G,rnd:S.state.rnd,choice:draft.choice,num:draft.num,tokens:draft.tokens,note:draft.note,extra:draft.extra,name:draft.name};
 var r=S.round,e="";if(!b.choice)e="Wybierzcie odpowied\u017A.";else if(r.kind==="decision"&&!b.tokens)e="Postawcie \u017Cetony pewno\u015Bci (1\u20133).";else if(r.extra&&!b.extra)e="Odpowiedzcie na pytanie o agenta AI.";
 if(e){msg(e,true);return}
 document.getElementById("send").disabled=true;
 fetch("/api/submit",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(b)}).then(function(x){return x.json()}).then(function(j){
  if(j.ok){msg("Wys\u0142ano \u2713",false);poll(true)}else{msg(j.err||"B\u0142\u0105d",true);document.getElementById("send").disabled=false}}).catch(function(){msg("Brak po\u0142\u0105czenia \u2013 spr\xF3bujcie ponownie.",true);document.getElementById("send").disabled=false})}
function msg(t,err){var m=document.getElementById("fmsg");if(m)m.innerHTML="<div class='msg "+(err?"err":"ok")+"'>"+esc(t)+"</div>"}
function result(){var x=S.result,m=S.mine,r=S.round,h="<div class=card><h2>Wynik rundy "+esc(r.code)+"</h2>";
 h+="<p>Poprawna odpowied\u017A: <b class=ok>"+x.answer+"</b> \xB7 Warto\u015B\u0107: <b>"+fmt(x.num)+"</b> "+esc(r.numUnit||"")+"</p>";
 if(!m)h+="<p class=bad>Brak Waszej odpowiedzi w tej rundzie (0 pkt).</p>";
 else h+="<p>Wasza odpowied\u017A: <b class="+(x.correct?"ok":"bad")+">"+m.choice+"</b> \xB7 \u017Cetony: "+m.tokens+" \xB7 liczba: "+fmt(m.num)+(x.numOk?" <span class=ok>(bonus +5)</span>":"")+"</p>";
 h+="<div class='big "+(x.pts>=0?"ok":"bad")+"'>"+(x.pts>0?"+":"")+x.pts+" pkt</div>";
 h+="<p>Razem: <b>"+S.total+" pkt</b> \xB7 miejsce: <b>"+S.place+"</b></p><p class=hint>"+esc(x.explain)+"</p></div>";return h}
function render(force){if(!S)return;var st=S.state,r=S.round;
 document.getElementById("team").textContent=(S.team||"")+" \xB7 nr "+G;
 var s=[st.rnd,st.phase,S.mine?S.mine.ts:0,!!S.result].join("|");if(!force&&s===sig)return;sig=s;
 var h="";
 if(st.phase==="lobby"||!r)h="<div class=card><h2>Czekamy na start rundy</h2><p>Prowadz\u0105cy otworzy rund\u0119 na ekranie. Ustalcie role: Operator AI, Rachmistrz, Sceptyk, Strateg, Pos\u0142aniec.</p></div>";
 else if(st.phase==="open"){h=roundHead(r)+promptBox(r)+form(r)}
 else if(S.result){h=result()+roundHead(r)}
 else{h="<div class=card><h2>Runda "+esc(r.code)+" zamkni\u0119ta</h2>"+(S.mine?"<p>Wasza odpowied\u017A: <b>"+S.mine.choice+"</b>"+(S.mine.tokens?" \xB7 \u017Cetony: "+S.mine.tokens:"")+(S.mine.num!=null?" \xB7 liczba: "+fmt(S.mine.num):"")+"</p><p>Czekamy na ods\u0142on\u0119 wynik\xF3w.</p>":"<p class=bad>Brak odpowiedzi w tej rundzie.</p>")+"</div>"+roundHead(r)}
 var y=window.scrollY;document.getElementById("app").innerHTML=h;if(force)window.scrollTo(0,y)}
function tick(){var t=document.getElementById("timer");if(!S||S.state.phase!=="open"){t.textContent=S&&S.state.phase==="closed"?"Zamkni\u0119te":"";return}
 var s=Math.round((S.state.deadline-(Date.now()+offset))/1000);if(s<=0){t.textContent="Czas!";t.className="bad";return}
 t.className="";t.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
function poll(force){fetch("/api/state?g="+G,{cache:"no-store"}).then(function(x){return x.json()}).then(function(j){offset=j.now-Date.now();S=j;
 var busy=document.activeElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA");
 if(force||!busy)render(force)}).catch(function(){})}
poll();setInterval(poll,3000);setInterval(tick,500);
<\/script></body></html>`], [`
body{font-size:16px;padding-bottom:5rem}
header{position:sticky;top:0;background:var(--navy2);padding:.7rem 1rem;border-bottom:2px solid transparent;border-image:var(--grad) 1;z-index:5;display:flex;justify-content:space-between;align-items:center}
header b{color:var(--gold2)}#timer{font-variant-numeric:tabular-nums;font-weight:700;font-size:1.2rem}
main{padding:1rem;max-width:640px;margin:auto}
.card{background:var(--card);border-radius:14px;padding:1rem;margin-bottom:1rem}
h2{margin:.2rem 0 .4rem;font-size:1.25rem}.topic{color:var(--mut);font-size:.9rem}
.tbl{overflow-x:auto;font-size:.88rem;margin:.6rem 0}
.q{font-weight:700;font-size:1.08rem;margin:.8rem 0 .5rem}
.opt{display:block;width:100%;text-align:left;padding:.85rem;margin:.4rem 0;border-radius:12px;border:2px solid var(--line);background:var(--in);color:var(--txt);font-size:1rem}
.opt.sel{border-color:var(--gold);background:#3a2e17;box-shadow:inset 0 0 0 2px var(--gold)}.opt b{color:var(--gold2);margin-right:.4rem}
.seg{display:flex;gap:.5rem}.seg button{flex:1;padding:.8rem 0;border-radius:12px;border:2px solid var(--line);background:var(--in);color:var(--txt);font-size:1.15rem;font-weight:700}
.seg button.sel{border-color:var(--gold);background:var(--grad);color:#1a1206}
input,textarea{width:100%;padding:.8rem;border-radius:10px;border:2px solid var(--line);background:var(--deep);color:var(--txt);font-size:1.05rem}
label{display:block;margin:.9rem 0 .35rem;font-weight:600}
.hint{color:var(--mut);font-size:.85rem;margin-top:.3rem}
.ans{background:var(--in);border-left:4px solid var(--gold);padding:.6rem;margin:.4rem 0;border-radius:6px;font-size:.92rem}
.prompt{white-space:pre-wrap;font-size:.8rem;background:var(--deep);padding:.6rem;border-radius:8px;max-height:9rem;overflow:auto;color:#d8d2c6}
.row{display:flex;gap:.5rem;margin-top:.5rem}.btn{flex:1;padding:.85rem;border-radius:12px;border:0;font-weight:700;font-size:1rem;text-align:center;text-decoration:none}
.btn.gold{background:var(--grad);color:#1a1206}.btn.ghost{background:var(--line);color:var(--txt)}
#send{width:100%;margin-top:1.2rem;padding:1rem;font-size:1.15rem}
.ok{color:var(--ok)}.bad{color:var(--bad)}.big{font-size:2rem;font-weight:800}
.msg{padding:.7rem;border-radius:10px;margin-top:.8rem}.msg.ok{background:#1d3a28}.msg.err{background:#4a1f1d;color:#ffd7d3}
details summary{cursor:pointer;color:var(--gold2);font-weight:600}
</style></head><body>
<header><div><img src="/logo.png" alt="Baldor" style="height:22px;display:block;margin-bottom:3px"><b>Gie\u0142da decyzji ELPLUS</b><br><span id="team">Zesp\xF3\u0142 __G__</span></div><div id="timer"></div></header>
<main id="app"><div class="card">\u0141\u0105czenie\u2026</div></main>
<script>
var G=__G__, S=null, draft={}, sig="", offset=0;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c]})}
function fmt(n){return (n==null||n==="")?"\u2014":String(n).replace(".",",")}
function tbl(t){if(!t)return "";var h="<div class=tbl><table><tr>"+t.headers.map(function(x){return "<th>"+esc(x)+"</th>"}).join("")+"</tr>";
 t.rows.forEach(function(r){h+="<tr>"+r.map(function(x){return "<td>"+esc(x)+"</td>"}).join("")+"</tr>"});return h+"</table></div>"}
function roundHead(r){var h="<div class=card><span class=badge>"+esc(r.code)+"</span> <h2>"+esc(r.title)+"</h2>";
 if(r.topic)h+="<div class=topic>"+esc(r.topic)+"</div>";
 h+="<p>"+esc(r.context)+"</p>"+tbl(r.table);
 if(r.answers)r.answers.forEach(function(a){h+="<div class=ans><b>Odpowied\u017A "+a.k+":</b> "+esc(a.t)+"</div>"});
 return h+"</div>"}
function promptBox(r){if(!r.prompt)return "";
 return "<div class=card><details><summary>Prompt dla AI (dane s\u0105 ju\u017C w \u015Brodku)</summary><div class=prompt id=pr>"+esc(r.prompt)+"</div></details>"+
 "<div class=row><button class='btn gold' onclick='copyP()'>Kopiuj prompt</button><a class='btn ghost' href='https://chatgpt.com/' target='_blank' rel='noopener'>Otw\xF3rz ChatGPT</a></div>"+
 "<div class=hint>Rachmistrz sprawdza wynik AI kalkulatorem. Sceptyk pyta: sk\u0105d ta liczba?</div><div id=cpmsg class=hint></div></div>"}
function copyP(){var t=S.round.prompt;function done(){document.getElementById("cpmsg").textContent="Skopiowano. Wklej w ChatGPT."}
 if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(done,fallback)}else fallback();
 function fallback(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy");done()}catch(e){}document.body.removeChild(a)}}
function form(r){var m=S.mine||{};
 if(draft.rnd!==r.id){draft={rnd:r.id,choice:m.choice||null,num:m.num!=null?String(m.num).replace(".",","):"",tokens:m.tokens||null,note:m.note||"",extra:m.extra||null,name:""}}
 var h="<div class=card>";
 if(S.mine)h+="<div class='msg ok'>\u2713 Odpowied\u017A wys\u0142ana. Mo\u017Cecie j\u0105 poprawi\u0107 do zamkni\u0119cia rundy.</div>";
 if(r.kind==="warmup")h+="<label>Nazwa zespo\u0142u (max 24 znaki)</label><input id=name maxlength=24 value='"+esc(draft.name||(S.team&&S.team.indexOf("Zesp\xF3\u0142")!==0?S.team:""))+"' oninput='draft.name=this.value'>";
 h+="<div class=q>"+esc(r.question)+"</div>";
 r.options.forEach(function(o){h+="<button class='opt"+(draft.choice===o.k?" sel":"")+"' onclick=\\"pick('choice','"+o.k+"')\\"><b>"+o.k+"</b>"+esc(o.t)+"</button>"});
 if(r.numLabel)h+="<label>"+esc(r.numLabel)+" ["+esc(r.numUnit)+"]</label><input id=num inputmode=decimal value='"+esc(draft.num)+"' oninput='draft.num=this.value' placeholder='np. 1234,5'><div class=hint>Trafienie z dok\u0142adno\u015Bci\u0105 \xB12\u20135% = +5 pkt.</div>";
 if(r.kind==="decision"){h+="<label>\u017Betony pewno\u015Bci</label><div class=seg>"+[1,2,3].map(function(t){return "<button class='"+(draft.tokens===t?"sel":"")+"' onclick='pick(\\"tokens\\","+t+")'>"+t+"</button>"}).join("")+"</div><div class=hint>Trafienie: +10 \xD7 \u017Cetony. B\u0142\u0105d: \u22125 \xD7 \u017Cetony.</div>"}
 if(r.extra){h+="<label>"+esc(r.extra.label)+"</label>";r.extra.options.forEach(function(o){h+="<button class='opt"+(draft.extra===o.k?" sel":"")+"' onclick=\\"pick('extra','"+o.k+"')\\"><b>"+o.k+"</b>"+esc(o.t)+"</button>"})}
 if(r.kind==="final")h+="<label>"+esc(r.noteLabel)+"</label><textarea id=note rows=3 maxlength=140 oninput='draft.note=this.value'>"+esc(draft.note)+"</textarea>";
 else if(r.kind==="decision")h+="<label>Uzasadnienie (opcjonalnie)</label><input id=note maxlength=100 value='"+esc(draft.note)+"' oninput='draft.note=this.value'>";
 h+="<button id=send class='btn gold' onclick='send()'>"+(S.mine?"Wy\u015Blij poprawk\u0119":"Wy\u015Blij odpowied\u017A")+"</button><div id=fmsg></div></div>";
 return h}
function pick(k,v){draft[k]=v;render(true)}
function send(){var b={g:G,rnd:S.state.rnd,choice:draft.choice,num:draft.num,tokens:draft.tokens,note:draft.note,extra:draft.extra,name:draft.name};
 var r=S.round,e="";if(!b.choice)e="Wybierzcie odpowied\u017A.";else if(r.kind==="decision"&&!b.tokens)e="Postawcie \u017Cetony pewno\u015Bci (1\u20133).";else if(r.extra&&!b.extra)e="Odpowiedzcie na pytanie o agenta AI.";
 if(e){msg(e,true);return}
 document.getElementById("send").disabled=true;
 fetch("/api/submit",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(b)}).then(function(x){return x.json()}).then(function(j){
  if(j.ok){msg("Wys\u0142ano \u2713",false);poll(true)}else{msg(j.err||"B\u0142\u0105d",true);document.getElementById("send").disabled=false}}).catch(function(){msg("Brak po\u0142\u0105czenia \u2013 spr\xF3bujcie ponownie.",true);document.getElementById("send").disabled=false})}
function msg(t,err){var m=document.getElementById("fmsg");if(m)m.innerHTML="<div class='msg "+(err?"err":"ok")+"'>"+esc(t)+"</div>"}
function result(){var x=S.result,m=S.mine,r=S.round,h="<div class=card><h2>Wynik rundy "+esc(r.code)+"</h2>";
 h+="<p>Poprawna odpowied\u017A: <b class=ok>"+x.answer+"</b> \xB7 Warto\u015B\u0107: <b>"+fmt(x.num)+"</b> "+esc(r.numUnit||"")+"</p>";
 if(!m)h+="<p class=bad>Brak Waszej odpowiedzi w tej rundzie (0 pkt).</p>";
 else h+="<p>Wasza odpowied\u017A: <b class="+(x.correct?"ok":"bad")+">"+m.choice+"</b> \xB7 \u017Cetony: "+m.tokens+" \xB7 liczba: "+fmt(m.num)+(x.numOk?" <span class=ok>(bonus +5)</span>":"")+"</p>";
 h+="<div class='big "+(x.pts>=0?"ok":"bad")+"'>"+(x.pts>0?"+":"")+x.pts+" pkt</div>";
 h+="<p>Razem: <b>"+S.total+" pkt</b> \xB7 miejsce: <b>"+S.place+"</b></p><p class=hint>"+esc(x.explain)+"</p></div>";return h}
function render(force){if(!S)return;var st=S.state,r=S.round;
 document.getElementById("team").textContent=(S.team||"")+" \xB7 nr "+G;
 var s=[st.rnd,st.phase,S.mine?S.mine.ts:0,!!S.result].join("|");if(!force&&s===sig)return;sig=s;
 var h="";
 if(st.phase==="lobby"||!r)h="<div class=card><h2>Czekamy na start rundy</h2><p>Prowadz\u0105cy otworzy rund\u0119 na ekranie. Ustalcie role: Operator AI, Rachmistrz, Sceptyk, Strateg, Pos\u0142aniec.</p></div>";
 else if(st.phase==="open"){h=roundHead(r)+promptBox(r)+form(r)}
 else if(S.result){h=result()+roundHead(r)}
 else{h="<div class=card><h2>Runda "+esc(r.code)+" zamkni\u0119ta</h2>"+(S.mine?"<p>Wasza odpowied\u017A: <b>"+S.mine.choice+"</b>"+(S.mine.tokens?" \xB7 \u017Cetony: "+S.mine.tokens:"")+(S.mine.num!=null?" \xB7 liczba: "+fmt(S.mine.num):"")+"</p><p>Czekamy na ods\u0142on\u0119 wynik\xF3w.</p>":"<p class=bad>Brak odpowiedzi w tej rundzie.</p>")+"</div>"+roundHead(r)}
 var y=window.scrollY;document.getElementById("app").innerHTML=h;if(force)window.scrollTo(0,y)}
function tick(){var t=document.getElementById("timer");if(!S||S.state.phase!=="open"){t.textContent=S&&S.state.phase==="closed"?"Zamkni\u0119te":"";return}
 var s=Math.round((S.state.deadline-(Date.now()+offset))/1000);if(s<=0){t.textContent="Czas!";t.className="bad";return}
 t.className="";t.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
function poll(force){fetch("/api/state?g="+G,{cache:"no-store"}).then(function(x){return x.json()}).then(function(j){offset=j.now-Date.now();S=j;
 var busy=document.activeElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA");
 if(force||!busy)render(force)}).catch(function(){})}
poll();setInterval(poll,3000);setInterval(tick,500);
<\/script></body></html>`])));
var _b;
var PAGE_SCREEN = String.raw`<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Giełda decyzji ELPLUS – ekran</title><style>` + CSS_BASE + String.raw(_b || (_b = __template([`
html,body{height:100%}body{font-size:1.25vw;overflow:hidden}
.top{display:flex;align-items:center;justify-content:space-between;padding:1vw 2vw;background:var(--navy2);border-bottom:.25vw solid transparent;border-image:var(--grad) 1}
.brand{font-size:1.6vw;font-weight:800;color:var(--gold2)}.rt{font-size:1.9vw;font-weight:700}
#timer{font-size:3.4vw;font-weight:800;font-variant-numeric:tabular-nums;min-width:12vw;text-align:right}
.grid{display:grid;grid-template-columns:64fr 36fr;gap:1.5vw;padding:1.5vw 2vw;height:calc(100% - 6.5vw)}
.panel{background:var(--card);border-radius:1vw;padding:1.3vw 1.6vw;overflow:hidden;min-height:0}
h1{font-size:2.4vw;margin:.2em 0}h2{font-size:1.8vw;margin:.2em 0 .5em}h3{color:var(--gold2);margin:.4em 0}
.q{font-size:1.7vw;font-weight:700;margin:.6em 0}
.opts div{padding:.35em .6em;margin:.25em 0;border-radius:.5vw;background:var(--in)}.opts b{color:var(--gold2);margin-right:.5em}
.tiles{display:grid;grid-template-columns:repeat(5,1fr);gap:.6vw;margin-top:1vw}
.tile{padding:.7vw;border-radius:.6vw;background:var(--in);text-align:center;font-weight:700;font-size:1.05vw;border:.15vw solid var(--line)}
.tile.on{background:var(--ok);color:#fff;border-color:var(--ok)}
.bar{display:flex;align-items:center;margin:.6vw 0;font-size:1.3vw}.bar .l{width:3vw;font-weight:800;color:var(--gold2)}
.bar .t{flex:0 0 40%;padding-right:1vw}.bar .b{flex:1;background:var(--in);border-radius:.4vw;height:2.4vw;position:relative}
.bar .f{height:100%;background:#7a6a4a;border-radius:.4vw}.bar.win .f{background:var(--ok)}.bar.win .l{color:var(--ok)}
.bar .n{position:absolute;right:.6vw;top:.35vw;font-weight:700}
.lb div.r{display:flex;align-items:center;padding:.45vw .6vw;margin:.3vw 0;border-radius:.5vw;background:var(--in);font-size:1.35vw}
.lb .p{width:2.6vw;font-weight:800;color:var(--gold2)}.lb .nm{flex:1}.lb .pt{font-weight:800;width:6vw;text-align:right}.lb .j{width:3vw;text-align:right;font-size:1vw}
.up{color:var(--ok)}.dn{color:var(--bad)}.exp{font-size:1.25vw;line-height:1.45;background:var(--in);padding:.8vw;border-radius:.6vw;border-left:.3vw solid var(--ok)}
.chips span{display:inline-block;margin:.2vw;padding:.2vw .6vw;border-radius:99px;background:var(--in);font-size:1vw}
.notes{columns:2;column-gap:1vw}.notes div{break-inside:avoid;background:var(--in);margin:0 0 .7vw;padding:.7vw;border-radius:.5vw;border-left:.3vw solid var(--gold);font-size:1.15vw}
.tbl{font-size:1vw;margin:.5vw 0}.podium{display:flex;align-items:flex-end;justify-content:center;gap:2vw;height:20vw;margin:1vw 0}
.podium div{width:14vw;text-align:center;border-radius:.8vw .8vw 0 0;background:var(--in);padding-top:1vw;font-weight:800}
.podium .g1{height:100%;background:var(--grad);color:#1a1206}.podium .g2{height:75%}.podium .g3{height:55%}
.lobby{display:flex;flex-direction:column;height:100%;align-items:center}
.lobby h1{font-size:3.2vw;margin:.3vw 0 0;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.lobby .sub{font-size:1.5vw;color:var(--mut);margin:.3vw 0 1vw}
.qrs{display:grid;grid-template-columns:repeat(5,1fr);gap:1.2vw;width:100%;flex:1;min-height:0}
.qr{background:#fff;border-radius:.8vw;padding:.6vw;text-align:center;color:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;border:.25vw solid var(--gold);min-height:0}
.qr b{font-size:1.5vw}.qr svg{height:calc(100% - 2.2vw);width:auto;max-width:100%}
.rules{display:flex;gap:2vw;font-size:1.3vw;margin-top:1vw;color:var(--txt)}.rules span b{color:var(--gold2)}
.center{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;text-align:center}
</style></head><body>
<div class="top"><div class="brand"><img src="/logo.png" alt="Baldor" style="height:2.4vw;vertical-align:middle;margin-right:1vw">Gie\u0142da decyzji ELPLUS</div><div class="rt" id="rt"></div><div id="timer"></div></div>
<div class="grid" id="grid"><div class="panel" id="main"></div><div class="panel lb" id="lb"></div></div>
<script>
var QR=__QR__;
var D=null,offset=0;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;"}[c]})}
function fmtN(n){return n==null?"\u2014":Number(n).toLocaleString("pl-PL")}
function nm(g){var t=D.board.teams.find(function(x){return x.grp===g});return t?t.name:"Zesp\xF3\u0142 "+g}
function tbl(t){if(!t)return "";var h="<div class=tbl><table><tr>"+t.headers.map(function(x){return "<th>"+esc(x)+"</th>"}).join("")+"</tr>";
 t.rows.forEach(function(r){h+="<tr>"+r.map(function(x){return "<td>"+esc(x)+"</td>"}).join("")+"</tr>"});return h+"</table></div>"}
function tiles(){var h="<div class=tiles>";for(var g=1;g<=D.n;g++)h+="<div class='tile"+(D.submitted.indexOf(g)>=0?" on":"")+"'>"+esc(nm(g))+"</div>";return h+"</div><p>Wys\u0142a\u0142o: <b>"+D.submitted.length+" / "+D.n+"</b></p>"}
function bars(r,win){var tot=0;for(var k in D.dist)tot+=D.dist[k];var h="";
 r.options.forEach(function(o){var c=D.dist[o.k]||0,w=tot?c/tot*100:0,avg=c&&D.tok[o.k]?(D.tok[o.k]/c).toFixed(1).replace(".",","):"";
 h+="<div class='bar"+(win===o.k?" win":"")+"'><div class=l>"+o.k+"</div><div class=t>"+esc(o.t.length>60?o.t.slice(0,58)+"\u2026":o.t)+"</div><div class=b><div class=f style='width:"+w+"%'></div><div class=n>"+c+(avg&&r.kind==="decision"?" \xB7 \u015Br. \u017Cetony "+avg:"")+"</div></div></div>"});return h}
function board(){var h="<h2>Ranking</h2>";D.board.teams.forEach(function(t){var j=t.jump>0?"<span class=up>\u25B2"+t.jump+"</span>":(t.jump<0?"<span class=dn>\u25BC"+(-t.jump)+"</span>":"");
 h+="<div class=r><span class=p>"+t.place+".</span><span class=nm>"+esc(t.name)+"</span><span class=j>"+j+"</span><span class=pt>"+t.total+"</span></div>"});return h}
function notesWall(list){if(!list||!list.length)return "<p>Brak wpis\xF3w.</p>";var A={A:"Dane o produktach",B:"Prognozy i planowanie",C:"Okna dostaw",D:"Zasady w niedoborze"};
 return "<div class=notes>"+list.map(function(n){return "<div><b>"+esc(nm(n.grp))+"</b> \xB7 "+esc(A[n.area]||"")+"<br>"+esc(n.note)+"</div>"}).join("")+"</div>"}
function render(){var st=D.state,r=D.round,m=document.getElementById("main"),lb=document.getElementById("lb"),grid=document.getElementById("grid");
 document.getElementById("rt").textContent=st.view==="podium"?"Podsumowanie":(st.phase==="lobby"?"":(r.code+" \xB7 "+r.title));
 if(st.view==="board"){grid.style.gridTemplateColumns="1fr";lb.style.display="none";m.innerHTML=board();return}
 if(st.view==="podium"){grid.style.gridTemplateColumns="1fr 1fr";lb.style.display="block";var t=D.board.teams;
  var ph="<h1>Podium</h1><div class=podium><div class=g2>2.<br>"+esc(t[1]?t[1].name:"")+"<br>"+(t[1]?t[1].total:"")+"</div><div class=g1>1.<br>"+esc(t[0]?t[0].name:"")+"<br>"+(t[0]?t[0].total:"")+"</div><div class=g3>3.<br>"+esc(t[2]?t[2].name:"")+"<br>"+(t[2]?t[2].total:"")+"</div></div>";
  var c=D.board.confidence;ph+="<h3>Pewno\u015B\u0107 a trafno\u015B\u0107</h3><p>\u015Arednia liczba \u017Ceton\xF3w przy trafieniach: <b>"+(c.right==null?"\u2014":String(c.right).replace(".",","))+"</b> \xB7 przy b\u0142\u0119dach: <b>"+(c.wrong==null?"\u2014":String(c.wrong).replace(".",","))+"</b></p>";
  if(D.mandate){ph+="<h3>Mandat dla agenta AI (R6)</h3><p>Sam: <b>"+(D.mandate["1"]||0)+"</b> \xB7 Proponuje, cz\u0142owiek zatwierdza: <b>"+(D.mandate["2"]||0)+"</b> \xB7 Tylko cz\u0142owiek: <b>"+(D.mandate["3"]||0)+"</b></p>"}
  m.innerHTML=ph;lb.innerHTML="<h2>Co testujemy w 30 dni?</h2>"+notesWall(D.notes);return}
 grid.style.gridTemplateColumns="64fr 36fr";lb.style.display="block";lb.innerHTML=board();fit(lb);
 if(st.phase==="lobby"){grid.style.gridTemplateColumns="1fr";lb.style.display="none";
  m.innerHTML="<div class=lobby><h1>Gie\u0142da decyzji ELPLUS \xB7 AI czy intuicja?</h1><div class=sub>Zeskanujcie kod QR swojego zespo\u0142u. Jeden telefon wysy\u0142a odpowied\u017A \u2013 pozostali mog\u0105 liczy\u0107 i sprawdza\u0107.</div><div class=qrs>"+
  QR.map(function(q,i){return "<div class=qr><b>Zesp\xF3\u0142 "+String(i+1).padStart(2,"0")+"</b>"+q+"</div>"}).join("")+
  "</div><div class=rules><span>Role: <b>Operator AI \xB7 Rachmistrz \xB7 Sceptyk \xB7 Strateg \xB7 Pos\u0142aniec</b></span><span>Trafienie <b>+10 \xD7 \u017Cetony</b> \xB7 B\u0142\u0105d <b>\u22125 \xD7 \u017Cetony</b> \xB7 Liczba w tolerancji <b>+5</b></span></div></div>";return}
 var h="<h1>"+esc(r.title)+"</h1>"+(r.topic?"<h3>"+esc(r.topic)+"</h3>":"");
 if(st.phase==="open"){h+="<p>"+esc(r.context)+"</p>"+tbl(r.table);if(r.answers)r.answers.forEach(function(a){h+="<div class=exp style='border-left-color:var(--gold);margin:.4vw 0;font-size:1.05vw'><b>"+a.k+":</b> "+esc(a.t)+"</div>"});
  h+="<div class=q>"+esc(r.question)+"</div><div class=opts>"+r.options.map(function(o){return "<div><b>"+o.k+"</b>"+esc(o.t)+"</div>"}).join("")+"</div>"+(r.numLabel?"<p>Liczba: "+esc(r.numLabel)+" ["+esc(r.numUnit)+"]</p>":"")+tiles()}
 else if(st.phase==="closed"){h+="<div class=q>"+esc(r.question)+"</div>"+bars(r,null)+(r.kind==="final"?notesWall(D.notes):"")+"<p>Odpowiedzi: "+D.submitted.length+" / "+D.n+"</p>"}
 else{h+="<div class=q>"+esc(r.question)+"</div>"+bars(r,D.key?D.key.answer:null);
  if(D.key){h+="<p style='font-size:1.5vw'>Poprawnie: <b class=up>"+D.key.answer+"</b> \xB7 Warto\u015B\u0107: <b>"+fmtN(D.key.num)+" "+esc(r.numUnit||"")+"</b></p><div class=exp>"+esc(D.key.explain)+"</div>";
   h+="<div class=chips style='margin-top:.8vw'>"+D.board.teams.slice().sort(function(a,b){return a.grp-b.grp}).map(function(t){var p=D.roundPts[t.grp]||0;return "<span>"+esc(t.name)+": <b class="+(p>=0?"up":"dn")+">"+(p>0?"+":"")+p+"</b></span>"}).join("")+"</div>";
   if(r.extra&&D.extra){h+="<h3>Mandat dla agenta AI</h3><p>"+r.extra.options.map(function(o){return esc(o.t)+": <b>"+(D.extra[o.k]||0)+"</b>"}).join(" \xB7 ")+"</p>"}}
  else if(r.kind==="final")h+=notesWall(D.notes)}
 m.innerHTML=h;fit(m)}
function fit(el){el.style.zoom=1;var z=1;while(el.scrollHeight>el.clientHeight+2&&z>0.6){z-=0.05;el.style.zoom=z}}
function tick(){var t=document.getElementById("timer");if(!D||D.state.phase!=="open"){t.textContent="";return}
 var s=Math.round((D.state.deadline-(Date.now()+offset))/1000);if(s<=0){t.textContent="0:00";t.style.color="var(--bad)";return}
 t.style.color=s<=60?"var(--gold2)":"";t.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
var lastSig="";function poll(){fetch("/api/screen",{cache:"no-store"}).then(function(x){return x.json()}).then(function(j){offset=j.now-Date.now();D=j;var s=JSON.stringify([j.state,j.submitted,j.dist,j.board.teams.map(function(t){return t.total+t.name}),j.notes]);if(s!==lastSig){lastSig=s;render()}}).catch(function(){})}
poll();setInterval(poll,2000);setInterval(tick,500);
<\/script></body></html>`], [`
html,body{height:100%}body{font-size:1.25vw;overflow:hidden}
.top{display:flex;align-items:center;justify-content:space-between;padding:1vw 2vw;background:var(--navy2);border-bottom:.25vw solid transparent;border-image:var(--grad) 1}
.brand{font-size:1.6vw;font-weight:800;color:var(--gold2)}.rt{font-size:1.9vw;font-weight:700}
#timer{font-size:3.4vw;font-weight:800;font-variant-numeric:tabular-nums;min-width:12vw;text-align:right}
.grid{display:grid;grid-template-columns:64fr 36fr;gap:1.5vw;padding:1.5vw 2vw;height:calc(100% - 6.5vw)}
.panel{background:var(--card);border-radius:1vw;padding:1.3vw 1.6vw;overflow:hidden;min-height:0}
h1{font-size:2.4vw;margin:.2em 0}h2{font-size:1.8vw;margin:.2em 0 .5em}h3{color:var(--gold2);margin:.4em 0}
.q{font-size:1.7vw;font-weight:700;margin:.6em 0}
.opts div{padding:.35em .6em;margin:.25em 0;border-radius:.5vw;background:var(--in)}.opts b{color:var(--gold2);margin-right:.5em}
.tiles{display:grid;grid-template-columns:repeat(5,1fr);gap:.6vw;margin-top:1vw}
.tile{padding:.7vw;border-radius:.6vw;background:var(--in);text-align:center;font-weight:700;font-size:1.05vw;border:.15vw solid var(--line)}
.tile.on{background:var(--ok);color:#fff;border-color:var(--ok)}
.bar{display:flex;align-items:center;margin:.6vw 0;font-size:1.3vw}.bar .l{width:3vw;font-weight:800;color:var(--gold2)}
.bar .t{flex:0 0 40%;padding-right:1vw}.bar .b{flex:1;background:var(--in);border-radius:.4vw;height:2.4vw;position:relative}
.bar .f{height:100%;background:#7a6a4a;border-radius:.4vw}.bar.win .f{background:var(--ok)}.bar.win .l{color:var(--ok)}
.bar .n{position:absolute;right:.6vw;top:.35vw;font-weight:700}
.lb div.r{display:flex;align-items:center;padding:.45vw .6vw;margin:.3vw 0;border-radius:.5vw;background:var(--in);font-size:1.35vw}
.lb .p{width:2.6vw;font-weight:800;color:var(--gold2)}.lb .nm{flex:1}.lb .pt{font-weight:800;width:6vw;text-align:right}.lb .j{width:3vw;text-align:right;font-size:1vw}
.up{color:var(--ok)}.dn{color:var(--bad)}.exp{font-size:1.25vw;line-height:1.45;background:var(--in);padding:.8vw;border-radius:.6vw;border-left:.3vw solid var(--ok)}
.chips span{display:inline-block;margin:.2vw;padding:.2vw .6vw;border-radius:99px;background:var(--in);font-size:1vw}
.notes{columns:2;column-gap:1vw}.notes div{break-inside:avoid;background:var(--in);margin:0 0 .7vw;padding:.7vw;border-radius:.5vw;border-left:.3vw solid var(--gold);font-size:1.15vw}
.tbl{font-size:1vw;margin:.5vw 0}.podium{display:flex;align-items:flex-end;justify-content:center;gap:2vw;height:20vw;margin:1vw 0}
.podium div{width:14vw;text-align:center;border-radius:.8vw .8vw 0 0;background:var(--in);padding-top:1vw;font-weight:800}
.podium .g1{height:100%;background:var(--grad);color:#1a1206}.podium .g2{height:75%}.podium .g3{height:55%}
.lobby{display:flex;flex-direction:column;height:100%;align-items:center}
.lobby h1{font-size:3.2vw;margin:.3vw 0 0;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.lobby .sub{font-size:1.5vw;color:var(--mut);margin:.3vw 0 1vw}
.qrs{display:grid;grid-template-columns:repeat(5,1fr);gap:1.2vw;width:100%;flex:1;min-height:0}
.qr{background:#fff;border-radius:.8vw;padding:.6vw;text-align:center;color:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;border:.25vw solid var(--gold);min-height:0}
.qr b{font-size:1.5vw}.qr svg{height:calc(100% - 2.2vw);width:auto;max-width:100%}
.rules{display:flex;gap:2vw;font-size:1.3vw;margin-top:1vw;color:var(--txt)}.rules span b{color:var(--gold2)}
.center{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;text-align:center}
</style></head><body>
<div class="top"><div class="brand"><img src="/logo.png" alt="Baldor" style="height:2.4vw;vertical-align:middle;margin-right:1vw">Gie\u0142da decyzji ELPLUS</div><div class="rt" id="rt"></div><div id="timer"></div></div>
<div class="grid" id="grid"><div class="panel" id="main"></div><div class="panel lb" id="lb"></div></div>
<script>
var QR=__QR__;
var D=null,offset=0;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c]})}
function fmtN(n){return n==null?"\u2014":Number(n).toLocaleString("pl-PL")}
function nm(g){var t=D.board.teams.find(function(x){return x.grp===g});return t?t.name:"Zesp\xF3\u0142 "+g}
function tbl(t){if(!t)return "";var h="<div class=tbl><table><tr>"+t.headers.map(function(x){return "<th>"+esc(x)+"</th>"}).join("")+"</tr>";
 t.rows.forEach(function(r){h+="<tr>"+r.map(function(x){return "<td>"+esc(x)+"</td>"}).join("")+"</tr>"});return h+"</table></div>"}
function tiles(){var h="<div class=tiles>";for(var g=1;g<=D.n;g++)h+="<div class='tile"+(D.submitted.indexOf(g)>=0?" on":"")+"'>"+esc(nm(g))+"</div>";return h+"</div><p>Wys\u0142a\u0142o: <b>"+D.submitted.length+" / "+D.n+"</b></p>"}
function bars(r,win){var tot=0;for(var k in D.dist)tot+=D.dist[k];var h="";
 r.options.forEach(function(o){var c=D.dist[o.k]||0,w=tot?c/tot*100:0,avg=c&&D.tok[o.k]?(D.tok[o.k]/c).toFixed(1).replace(".",","):"";
 h+="<div class='bar"+(win===o.k?" win":"")+"'><div class=l>"+o.k+"</div><div class=t>"+esc(o.t.length>60?o.t.slice(0,58)+"\u2026":o.t)+"</div><div class=b><div class=f style='width:"+w+"%'></div><div class=n>"+c+(avg&&r.kind==="decision"?" \xB7 \u015Br. \u017Cetony "+avg:"")+"</div></div></div>"});return h}
function board(){var h="<h2>Ranking</h2>";D.board.teams.forEach(function(t){var j=t.jump>0?"<span class=up>\u25B2"+t.jump+"</span>":(t.jump<0?"<span class=dn>\u25BC"+(-t.jump)+"</span>":"");
 h+="<div class=r><span class=p>"+t.place+".</span><span class=nm>"+esc(t.name)+"</span><span class=j>"+j+"</span><span class=pt>"+t.total+"</span></div>"});return h}
function notesWall(list){if(!list||!list.length)return "<p>Brak wpis\xF3w.</p>";var A={A:"Dane o produktach",B:"Prognozy i planowanie",C:"Okna dostaw",D:"Zasady w niedoborze"};
 return "<div class=notes>"+list.map(function(n){return "<div><b>"+esc(nm(n.grp))+"</b> \xB7 "+esc(A[n.area]||"")+"<br>"+esc(n.note)+"</div>"}).join("")+"</div>"}
function render(){var st=D.state,r=D.round,m=document.getElementById("main"),lb=document.getElementById("lb"),grid=document.getElementById("grid");
 document.getElementById("rt").textContent=st.view==="podium"?"Podsumowanie":(st.phase==="lobby"?"":(r.code+" \xB7 "+r.title));
 if(st.view==="board"){grid.style.gridTemplateColumns="1fr";lb.style.display="none";m.innerHTML=board();return}
 if(st.view==="podium"){grid.style.gridTemplateColumns="1fr 1fr";lb.style.display="block";var t=D.board.teams;
  var ph="<h1>Podium</h1><div class=podium><div class=g2>2.<br>"+esc(t[1]?t[1].name:"")+"<br>"+(t[1]?t[1].total:"")+"</div><div class=g1>1.<br>"+esc(t[0]?t[0].name:"")+"<br>"+(t[0]?t[0].total:"")+"</div><div class=g3>3.<br>"+esc(t[2]?t[2].name:"")+"<br>"+(t[2]?t[2].total:"")+"</div></div>";
  var c=D.board.confidence;ph+="<h3>Pewno\u015B\u0107 a trafno\u015B\u0107</h3><p>\u015Arednia liczba \u017Ceton\xF3w przy trafieniach: <b>"+(c.right==null?"\u2014":String(c.right).replace(".",","))+"</b> \xB7 przy b\u0142\u0119dach: <b>"+(c.wrong==null?"\u2014":String(c.wrong).replace(".",","))+"</b></p>";
  if(D.mandate){ph+="<h3>Mandat dla agenta AI (R6)</h3><p>Sam: <b>"+(D.mandate["1"]||0)+"</b> \xB7 Proponuje, cz\u0142owiek zatwierdza: <b>"+(D.mandate["2"]||0)+"</b> \xB7 Tylko cz\u0142owiek: <b>"+(D.mandate["3"]||0)+"</b></p>"}
  m.innerHTML=ph;lb.innerHTML="<h2>Co testujemy w 30 dni?</h2>"+notesWall(D.notes);return}
 grid.style.gridTemplateColumns="64fr 36fr";lb.style.display="block";lb.innerHTML=board();fit(lb);
 if(st.phase==="lobby"){grid.style.gridTemplateColumns="1fr";lb.style.display="none";
  m.innerHTML="<div class=lobby><h1>Gie\u0142da decyzji ELPLUS \xB7 AI czy intuicja?</h1><div class=sub>Zeskanujcie kod QR swojego zespo\u0142u. Jeden telefon wysy\u0142a odpowied\u017A \u2013 pozostali mog\u0105 liczy\u0107 i sprawdza\u0107.</div><div class=qrs>"+
  QR.map(function(q,i){return "<div class=qr><b>Zesp\xF3\u0142 "+String(i+1).padStart(2,"0")+"</b>"+q+"</div>"}).join("")+
  "</div><div class=rules><span>Role: <b>Operator AI \xB7 Rachmistrz \xB7 Sceptyk \xB7 Strateg \xB7 Pos\u0142aniec</b></span><span>Trafienie <b>+10 \xD7 \u017Cetony</b> \xB7 B\u0142\u0105d <b>\u22125 \xD7 \u017Cetony</b> \xB7 Liczba w tolerancji <b>+5</b></span></div></div>";return}
 var h="<h1>"+esc(r.title)+"</h1>"+(r.topic?"<h3>"+esc(r.topic)+"</h3>":"");
 if(st.phase==="open"){h+="<p>"+esc(r.context)+"</p>"+tbl(r.table);if(r.answers)r.answers.forEach(function(a){h+="<div class=exp style='border-left-color:var(--gold);margin:.4vw 0;font-size:1.05vw'><b>"+a.k+":</b> "+esc(a.t)+"</div>"});
  h+="<div class=q>"+esc(r.question)+"</div><div class=opts>"+r.options.map(function(o){return "<div><b>"+o.k+"</b>"+esc(o.t)+"</div>"}).join("")+"</div>"+(r.numLabel?"<p>Liczba: "+esc(r.numLabel)+" ["+esc(r.numUnit)+"]</p>":"")+tiles()}
 else if(st.phase==="closed"){h+="<div class=q>"+esc(r.question)+"</div>"+bars(r,null)+(r.kind==="final"?notesWall(D.notes):"")+"<p>Odpowiedzi: "+D.submitted.length+" / "+D.n+"</p>"}
 else{h+="<div class=q>"+esc(r.question)+"</div>"+bars(r,D.key?D.key.answer:null);
  if(D.key){h+="<p style='font-size:1.5vw'>Poprawnie: <b class=up>"+D.key.answer+"</b> \xB7 Warto\u015B\u0107: <b>"+fmtN(D.key.num)+" "+esc(r.numUnit||"")+"</b></p><div class=exp>"+esc(D.key.explain)+"</div>";
   h+="<div class=chips style='margin-top:.8vw'>"+D.board.teams.slice().sort(function(a,b){return a.grp-b.grp}).map(function(t){var p=D.roundPts[t.grp]||0;return "<span>"+esc(t.name)+": <b class="+(p>=0?"up":"dn")+">"+(p>0?"+":"")+p+"</b></span>"}).join("")+"</div>";
   if(r.extra&&D.extra){h+="<h3>Mandat dla agenta AI</h3><p>"+r.extra.options.map(function(o){return esc(o.t)+": <b>"+(D.extra[o.k]||0)+"</b>"}).join(" \xB7 ")+"</p>"}}
  else if(r.kind==="final")h+=notesWall(D.notes)}
 m.innerHTML=h;fit(m)}
function fit(el){el.style.zoom=1;var z=1;while(el.scrollHeight>el.clientHeight+2&&z>0.6){z-=0.05;el.style.zoom=z}}
function tick(){var t=document.getElementById("timer");if(!D||D.state.phase!=="open"){t.textContent="";return}
 var s=Math.round((D.state.deadline-(Date.now()+offset))/1000);if(s<=0){t.textContent="0:00";t.style.color="var(--bad)";return}
 t.style.color=s<=60?"var(--gold2)":"";t.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
var lastSig="";function poll(){fetch("/api/screen",{cache:"no-store"}).then(function(x){return x.json()}).then(function(j){offset=j.now-Date.now();D=j;var s=JSON.stringify([j.state,j.submitted,j.dist,j.board.teams.map(function(t){return t.total+t.name}),j.notes]);if(s!==lastSig){lastSig=s;render()}}).catch(function(){})}
poll();setInterval(poll,2000);setInterval(tick,500);
<\/script></body></html>`])));
var _c;
var PAGE_ADMIN = String.raw`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Panel prowadzącego</title><style>` + CSS_BASE + String.raw(_c || (_c = __template([`
body{padding:1rem;font-size:15px;max-width:900px;margin:auto}h1{color:var(--gold2);font-size:1.3rem}
button{padding:.6rem .9rem;border-radius:8px;border:0;background:var(--line);color:var(--txt);font-weight:700;margin:.2rem;cursor:pointer}
button.gold{background:var(--grad);color:#1a1206}button.red{background:var(--bad)}
.box{background:var(--card);border-radius:12px;padding:1rem;margin:.8rem 0}input{padding:.5rem;border-radius:6px;border:1px solid var(--line);background:var(--deep);color:var(--txt);width:4.5rem}
#st{font-size:1.1rem}.rr{display:flex;align-items:center;gap:.5rem;padding:.3rem 0;border-bottom:1px solid var(--line)}.rr span{flex:1}
.ok{color:var(--ok)}.bad{color:var(--bad)}
</style></head><body>
<h1>Gie\u0142da decyzji ELPLUS \xB7 panel prowadz\u0105cego</h1>
<div class=box>Klucz: <input id=key type=password style="width:12rem"> <button onclick="saveKey()">Zapisz</button> <a href="/screen" target="_blank" style="color:var(--gold2)">Otw\xF3rz ekran</a> \xB7 <a href="/qr" target="_blank" style="color:var(--gold2)">Kody QR</a></div>
<div class=box style="display:flex;align-items:center;justify-content:space-between;gap:.5rem;flex-wrap:wrap"><span><b>Nowa gra</b> \xB7 czy\u015Bci odpowiedzi, nazwy zespo\u0142\xF3w i ranking, wraca do ekranu startowego</span><button class=red onclick="reset()">\u21BB Nowa gra (RESET)</button></div>
<div class=box><div id=st>\u2026</div>
<button class=gold onclick="act('close')">Zamknij rund\u0119</button><button onclick="act('extend')">+1 min</button><button class=gold onclick="act('reveal')">Ods\u0142o\u0144 wynik</button>
<button onclick="act('lobby')">Ekran startowy</button><br>Widok ekranu: <button onclick="act('view',{view:'round'})">Runda</button><button onclick="act('view',{view:'board'})">Ranking</button><button onclick="act('view',{view:'podium'})">Podium</button></div>
<div class=box id=rounds></div>
<div class=box><b>Odpowiedzi w bie\u017C\u0105cej rundzie</b><div id=key2></div><table id=subs></table></div>
<div class=box><button onclick="exp()">Eksport CSV</button> <span style="opacity:.7">\u2013 pobierz wyniki przed now\u0105 gr\u0105</span></div>
<script>
var K=localStorage.getItem("gkey")||"";document.getElementById("key").value=K;
function saveKey(){K=document.getElementById("key").value;localStorage.setItem("gkey",K);peek()}
function act(a,o){var b=Object.assign({key:K,action:a},o||{});return fetch("/api/admin",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(b)}).then(function(x){return x.json()}).then(function(j){if(!j.ok)alert(j.err||"B\u0142\u0105d");peek();return j})}
function openR(i){var m=document.getElementById("m"+i).value;act("open",{rnd:i,minutes:m})}
function del(g){if(confirm("Usun\u0105\u0107 odpowied\u017A zespo\u0142u "+g+"?"))act("delete",{g:g})}
function reset(){if(!confirm("Rozpocz\u0105\u0107 now\u0105 gr\u0119? Wszystkie odpowiedzi, nazwy zespo\u0142\xF3w i punkty zostan\u0105 usuni\u0119te."))return;act("reset",{confirm:"RESET"}).then(function(j){if(j&&j.ok){built=false;alert("Gotowe \u2013 gra zresetowana. Mo\u017Cna zaczyna\u0107 od nowa.")}})}
function exp(){location.href="/api/export?key="+encodeURIComponent(K)}
var built=false;
function peek(){fetch("/api/admin",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({key:K,action:"peek"})}).then(function(x){return x.json()}).then(function(j){
 if(!j.ok){document.getElementById("st").innerHTML="<span class=bad>"+(j.err||"Brak dost\u0119pu")+"</span>";return}
 var s=j.state,ph={lobby:"start",open:"OTWARTA",closed:"zamkni\u0119ta",revealed:"ods\u0142oni\u0119ta"}[s.phase];
 var left=s.phase==="open"?Math.max(0,Math.round((s.deadline-Date.now())/1000)):null;
 document.getElementById("st").innerHTML="Runda: <b>"+j.rounds[s.rnd].code+" "+j.rounds[s.rnd].title+"</b> \xB7 status: <b>"+ph+"</b>"+(left!=null?" \xB7 zosta\u0142o "+Math.floor(left/60)+":"+String(left%60).padStart(2,"0"):"")+" \xB7 widok: "+s.view+" \xB7 ods\u0142oni\u0119te: "+s.revealed.join(", ");
 if(!built){built=true;document.getElementById("rounds").innerHTML="<b>Rundy</b>"+j.rounds.map(function(r){return "<div class=rr><span>"+r.code+" \xB7 "+r.title+"</span>min <input id=m"+r.id+" value="+r.minutes+"><button class=gold onclick='openR("+r.id+")'>Otw\xF3rz</button></div>"}).join("")}
 document.getElementById("key2").innerHTML=j.key?"Klucz: <b>"+j.key.answer+"</b> \xB7 liczba "+j.key.num+" (\xB1"+Math.round(j.key.tol*100)+"%)":"";
 document.getElementById("subs").innerHTML="<tr><th>Zesp.</th><th>Wyb\xF3r</th><th>Liczba</th><th>\u017Bet.</th><th>Mandat</th><th>Notatka</th><th></th></tr>"+j.subs.sort(function(a,b){return a.grp-b.grp}).map(function(x){
  var c=j.key?(x.choice===j.key.answer?"ok":"bad"):"";return "<tr><td>"+x.grp+"</td><td class="+c+">"+x.choice+"</td><td>"+(x.num==null?"":x.num)+"</td><td>"+(x.tokens||"")+"</td><td>"+(x.extra||"")+"</td><td>"+(x.note||"").replace(/</g,"&lt;")+"</td><td><button onclick='del("+x.grp+")'>\xD7</button></td></tr>"}).join("")})}
peek();setInterval(peek,3000);
<\/script></body></html>`])));
var PAGE_QR = String.raw`<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Kody QR zespołów</title>
<style>body{font-family:system-ui;margin:1rem}.g{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem}.c{border:3px solid #d9a13b;border-radius:10px;padding:.6rem;text-align:center;page-break-inside:avoid}
.c h2{margin:.2rem 0;color:#111214}.c small{word-break:break-all;color:#555}svg{width:100%;height:auto}@media print{.np{display:none}}</style></head><body>
<p class=np>Każdy kod prowadzi do formularza jednego zespołu. Pokaż na ekranie albo zapisz jako PDF (Ctrl+P) i umieść na Google Drive.</p>
<img src="/logo.png" alt="Baldor" style="height:48px;background:#111214;padding:8px 14px;border-radius:8px"><h1 style="margin:.4rem 0 1rem">Giełda decyzji ELPLUS · kody QR zespołów</h1><div class=g>__CARDS__</div></body></html>`;

// src/worker.js
var import_qrcode_generator = __toESM(require_qrcode());

// src/logo.js
var LOGO_PNG_B64 = "iVBORw0KGgoAAAANSUhEUgAAAoAAAADQCAYAAACX3ND9AAEAAElEQVR42uy9eZylZ1Un/j3ned97q6r3TjobWQg7aRY1CCpKOoCiDoJblQu4jAzEBUfHZQbH30x14TY6zjijzCjMuK90uQIqAtrdyKoJjEDCGiD71nvXcu99n3PO749znufeICAECJ3Oe/iEdKqrbt37bs95vue7AH311VdfAADqD0FfffXVV//E76uvvj6bdeMfPP38vH37bk2bOkdGnWZulW04GMDabJaTIo9oMgYwHINEeAhgMBiC2mHCADBJOpBGJykziTCREbJSl41sTtQk6QATWJrXsbE1GOYuLXCn47RlfiiTMTBkJcodj9tsxEqDriEMgDwapmYb50G830HLhmaLAmMAQyB3DM7c5Y4HzNyJ8MTILA8kW2pabXScWh1yIgBo503NkhElAiUCKU201bFC0QkN2mTtQpYhSyLlBgRGBwCJMBigm8xZOw+dINnWdgBgAoySnOjW5mhMzUQstwCIB4yFBYzWqW2Hbep0pHNM2TQJFgB0HVoAMLXB3KSBaIKpAUDbNNoZKQC0aAETm5jaoGWbdAC00/Us1OpAs0lLrAmTkaFNBgiZtWrZMtpk6BKZTnQwN2A00FZEQImIwZ10TcvgnDtGVkLXoW3EcrPZmmYxmcsQkm6TuANgo7FisI7JZIDUth3abCpbFJptOKc0ngDQzgaYYNIpbR1yJh0nwqghSQwAEGFI0skoW7uFzLqBAMC6raXxiA2YgLKSopVuc4MHDRuGA7TKhoZtpGQtNzoejzFsO8N4hLVxSsPhEOfOZx0DGAEYKpt1nZJu8Pl3vvsO+lFs9nd7X331DWBffT2oy5aXmVZW9H2v+pnHNPe89k252dyiICQWGIyIyYBERDA1A0QAU5gZzIyIzRIziBJTYhDBwGwwIyIjJkBFyKBgJjPAmAnEDQyNKTdG3IIMBAOQyBhEph2BNN4CAQQQEoiTcSIYgYjZiJIB8PcCAFCCGYGU/AsMosaAREYNQI1RasCcQAwDEeIbCSAQsxnIzJSY2YhgZJn924gAgwHgdgHgISixEbUAEQiAiZhBEmBkpmZQbxi5BXNDxEMGyIygxI0RAFgGoAAUppmZEK+ngBkMyYjYiAhmCn8PbDBAcwfVzr/NjKFCUIGaxeciI7CqMWD+8+bH2phM1YRMjWBKZplMhWAZpgoyhVoHMwVpE8fFyERhKqbagcAwg3er1BiBzETJAJCpqWSCGsxUTTqCKpsZQRUGIaj6WyKCIfnHIyWYmUqGqhLETBVQKJgSmBjEbGoJZmSkAtMxVDLMADUCQGACCP5hVS23edzcczu/et8vf+Bbl5eNV1ag/ROgr77O3Gr6Q9BXX5/D2g9gBRifvMU2j929bbiQBhNVgAXeeBlAAINhplA1wAhqBoB8gWWAiJASg5hhRCBiqAoI6rs4IjB5j0fMIDYYJuCUQNTAoNFFANFtQU3954kBYl/UGSBO/nPxuoZodgwwMySmaUMGA4FB3ALMIG/yIImRUhvtnMJ/nLy5IP8dCgaRATA/DkbwnipBuwxKLYgTiJK3j8SxazWoif85vqYGZBA4DUGciDkli7+DWWx1DWoGVQOxAaYAMZgTNJo6BgFxLqACmEGlA0GhKjBVmPpxQHye6M4cVIxjZCYgU4DIf04yJJp7qEI1gwneNMIAZJgaVHN8D/x3mYLBkHhdP+rk14h0/vPxc96xAmYCzR0Qh1ZNYcZgFqgqLL4OGEwEpgKRcs2Jn8O4jpjhjaoaVBRZtH5eIkMiAsdxbVRx+p7jLWDYe0MPLvTVV98A9tXXg7n/278CALj2Vb927Iq959+1fedFF8tkpMYNgwxEDDJH4FTFF2UiOEwVCz4BnLwJtLo8J2+OTKMJA0DsjRr5DzDFOg/A4Iu5IzgGRjQ+lv3navOWvGkRgJvGGxBibywD8bH4PYbkDVz9s/9uI4ACUaLEUCMwOP5sIAcQvZlFeS1vOKZtQwNCAzODwsBIUIclowlsoSZgSt4YEddG1tSgUEQXEw2TA3jeUkscmBSNlB8fIJpJVZhqNE/+XtRytJ4AmGCSAQME/pqi2Q9u7TUdmzQxwBhqKc5DAkjB3ETjKvX8GMTfbzSrph0MBgXBTACQN6/EMFVvCtVRO1Dj75nMGzwG1JFBEAjMDUQ6oLbQiM1GfDMzAkmEGiExAwZ03SSureRYX9ksGGCmECjADE6QZJp0cnqtv+v76qtvAPvqq6+onbsWGiK0ZkKAchm6wmdyUHU0xSjQpYIAkjdgKgowgdgnsICBieGz3UDqTLw5MANUwU0LU/EmgGJs56AT1CZIlhwNhHpjQ8nRuvrWuorxUSz6HL/HgGhSo52IP4O4/jwgMPPWyqCAKJiTf6+pN6LUAmbRgKJ+Fu8wvOlJqTRxjqBRagKJ5GiaS19DIJMYw3KMMwNhUw3UVKP98XfF3HgjCdTRO8Og5M1QYj83pn5ciAgqefq63umCTBBYGFQERAYyg6lATf2gw0Am0Yw6sstsDkRaF32qeTMpfl6J4I2bBUIKi1GsIRlBofF+Esg6mPo5ElNwoH2qcdxgPr0nvx4IEtebo5IORnuDbDHiJgQ4q+IbAIvmGHBk1hiSBcJEE1USSQMAWLyi7j366quvvgHsq68Hb8kYRgYTM0dYCD4yJB/RIVov7wLK5NL5aKpASgwjOBpn0fSZel8R30uBdHkj5M0HRfNm5ohWab44mixTBVECB/rlo02AuDR95XcBzFwbg8J3879M4GCDwQBjb1b8fZTGzBsmK2NWKu2e/z5TAadAGkHO1zMDUYKIetPCCYQEmDnqFeNnxHgZKt6scopjQYFyScVBnefnxw5mMNbakMXH9L9HaVIRxyB+LlAzRysJJt7g+TGxQOQAs0DtmJCsgeRc0VOYgsigWaIpjLFxnD92pqX3fCp+NOJ3q+V6PjQ+gzeFk0AtvcmFiv98nL96XslRSs2dnzGiSg2IizGuq0Aeo9lLRFBRcIz0zRy5zSrx3hnUZWxOrB/99tVX3wD21VdfpXLjlH91/r2ZqA9UY5HmGO/W5o4K2uYTN4lGQKJ5M+PaP2k0gyB2sW0gPSbOM7TgGToyGCPk0khSIHIFUYwZphWeXDRnYIaIoQhGEM0gF46eFT6jI4WhagF4Fm2LkatqmSc7epZceKCqYI73YDFuNYDJYGpTPiGnGNk6qhef2LFIjjF4HY2Tjy+tNFsz/UmMUgsYW6bGCnExDlI0flIba5SRt0WjFI23qQBaGvZ4dzFS9XOqUPXGHPF3xC5GNhNHdaMRc65g6QD9PTu2GM1cRTMthCwUpy2Og2XfKJBW9NGbtGnTmYidG6jkHM5AAUXj+6GBQCeodJBAfFX996gJLDtCa4T4OUB62UdfffUNYF999TXTAI7XTXTOzIAsClftproQSyBsMHHuXIgKiLyvYA6BRHD4KKEKHAiIpijGczEq5kDIAp/x0a9qjJGtInClKakoIZELR2IEW5BFYopxaZqKR8p4t6J5BZL092ZioFTQv+DkeTcRHED1sSR81lhEJUXQAgNU/D2TWfD3CIArZMGO0hFxND/+Go5w8rSBxfTzIsQZiPdt8fOIRpOMyiC88jILqupdIsNMINJV5K8qKwKRE7XKBbQyekWIQ3zoj/LSZo4CajSVNLsRCHRSVb2pnBGZmGmgyEEliPPn32uBBBb0TwEwUmpc2RzUA/+MORrhhMQMyTpFZi3HZoACiSVnZHKCSAbHxoHM0DSM1KS+Beyrr74B7KuvvkqNh1uIlMmFH8nbD3UOGcWo1LldipRSICsazRtqwzblZWnl5lHw1RAiDArRhvdy3vSIio9GORhwsZAXFh+VcWoilLmyW5C4KAXB/eJCIuSCjsX3JkeSbAbdIyIXF4RCGXDlMVMCI3nPxCmEHoJEjSOXEG+Ig+vHhPqZKBTMVhpGLUrgFFxGF3OoKRKj2rXYvQbOVI9lGWm7LaBNRRTQ4AsGES+4dBZ/b2rgNIDmsb8nbpwzWZrmQFGLMpdi/A2L9t4K/zO+JgXfA1QMRAbJ4uNhd9OpY2QXj4TghDgQQwmxs3Mfq9q3CmD8U4uWpt6vLVOLUXAIVwwg0hk1s/+gxHjZ+aQcDaUfJ6iiTYwhEwZD6kfAffX1ACnuD0FffX3ua30dYGZLzruzWYa8L7Q+2nXBg00bs7qeFgQt+hEL8UXltxV18JQbZoEuwsJ2JcaiiGaEYjRcx8MATDSQv8KFK8hgeU9cG6fCffOmlGIciql6mbnyD00FIJtyD2cbCfPmUwNFY2qiiQn0jHjaK1UBRQrlMddRbXlvKI2WBmJV1cNc3xfHqDr8ob0h0iIgmfhn4FC+lnFyjLCLIKOMup3755w65qYeY6Ji2xJoXKi+3Y6m8CfL6JeqRQyRehPIXC14qCC4cR40C0wNIhkmOSxoZs5LRfCkvFXk3FUrHJFADwsCGiPeVJxzNBDFOD7+1lx9ruLNpajzU6MXRyIDNf2S0ldffQPYV1991Ro0MNGC5lgJogikRpHKSLIu3oUPRzMKXfdi00ronx1pFvWwI3RMyRE9I1hwCRnsfK+wGimLPof9stWOL0a+oTbgOq4t/cpUfFCavfqzYSdTm9bgLhIlt38BV86dxecto9/KyzODkXMLqVqzSCB38ZlEkCi5Z6AJJMyezRTMU5FIacQQXDuECMXi8xVlL6q4xXmRxG38Lg2e3hQJBMi9EDXHsSloKE8RRiv2OFQ/m6lzBSlEIBZ+gIbCK3RbGDMCpRSNu/vzFeSUAt3j8l7LyB4EN5gWmHTRtGtFNmuvaRSqXn8/007fj4kUhXNsMMLL242HqGw4HLEMcTVUCaIUr8kCAKu9D2BffaEfAffVV1+YZJCZUhERFAsVZh95qklt+Mqw0kyq4KCqb6PBMIsmsoogpqbIMIOIINXGzQI5mppFuxl0qmIJTk2huk3HuijT4HAfrMbFZbKbQqlMtVkxmzamFJ559X2hGEhzbVCI0hTWJEzxQwOsImYNOHnDyMWHjgCRCTg1oJSC61gsVgKVNJ6qotk/r5srW/RyoeQtQhDTsJohKHJIb8NUW6c8P46fITjHcaorcUsWQpo2rGEhgxgrT5vsYOAZR/Ndxs2NJ4+IJ5eUK0INIAsja5SRuETDGnY4RQhixeTbeY0lwQPgsLSxqQBGtY5/q9pZzcfnYq4GLuIYDTSSCTlLvSZyVqSGMOmAcddTAPvqq0cA++qrr1pbStNVMb1AAouVMNEMX81w7yExwj9OQ4hgVZhQGkrvQgJNI8Dj3CwEGlbTP6ajSZumcNQxZEEWUX9HRSbLCNqkChCA6eswhcChcP8w5ddRpG1gZpxNNPW5Q3DiVMVtj0nhIo+Ib0OGhVefI4o5ElJS8Bip2qlM33kRlaCOOYt6tnDiHCHrojGTGVGIgUrXQx72RuQ2PFQtd4rJtNVZOZmPr6v6Nxq70vwhxDpEKTQyVgLy4j1pRfG4Nv4+bqVQHANTBDOlIlyRek1V659yPOO/Hc20+o/mXM+3j3H9FSSUzCLFlibQXbWZNBSpMXCzHMFJ1hgz99VXXz0C2FdffQEAxmJUGkAmEHPgdsTADGE/S44RbTSE0QRNx6xUrVPcKiYIWBU7DHSrIHOYKmxL/1VFIqRgauJ1rUaMVYPnaDATcaRoeEPVFG6c5mkcWrGR0ZJmUXJxmxmBMNeRsk27qXi/YSmiAq2ef+yj68odpBC8eGSZR9eViDqJ+LoUo+XiCYip6MUcDSOm2igW7mH1+cM0nq8ktJh0jm6GAXNR5VLJYDFAtXOVcphwAxx8SptG0UUaSeHWUeVrlmPNUM0+5o20FrdqydOev/AHzXmCDDd9nsbQhQq4NNbc1Ei5uPYgxXdSXXmummtCixog5k2jSFEDc42h4xj/UvKvNeSKaQ0QUUT6m72vvvoGsK+++io1TGTMZJwIKcEAJZv1aKvq3pLLO0XkuGRXRANVR8ExIqYZsQgVLz6KJquYMxfPvNJ0satwy0JeZCQI38DSNCL0okQlrWOGfxjvUzQ7wlewONOKdPnvC+uUaq5C4JRq41U4gRRjaZpObquy2WBgNp892zSyzjSDuQFx680Tc2QHR1wZIj0lTLc5pRCHRMIFpggnRdNKRLM9m4/RTQLtClNrk1DRFuGIVICNOJXuCmRhFF0bePH3GQpuNsc4Z0fDRXCj2k3zjisaWEavDRSeX0zsCS6mU1RVRTx6LyxhPGrQqrUQxX/nrBXB1DCyxtTvOsbpgZ5W+0SaGl7rVGREZoByf7P31Rf6EXBfffWF6QyYk2esThWacJQl0B2LfFUVH7Mykxu1mDd/09Gtx6yVv6vdCqZ+fjUfF6X5o6pOregXpRgTV3ipCh0MdK/GkGpyR+lTZGasyRU5c7XsVLxSbVaIZvJ6C0JZlLEFGS2iFtQsZCYLz0EfZ5t0Hr9GU5QytMLgNAjOINV8Y+9mqE5Ai4q2qFyJKn4V78NqJos3pdNYPiaeGRvHUaujWa4IYvnc1Uy5fF9RXzNH5m6eGfVPuZ7lGCCcHMvPovIzaSpKIc9TLs2hmoa9kCu6KdBKEx8TF2QQ09Z7ulGY1ZMX65wqLnJBi5p7HMIsfg+5ECZeuyk6mL766qtvAPvqqy/nAFIqI0utyRVECRLKXdXi7YfKxSMqdi1av1hTLyo6NrUkCblGjIZD4MFTtac5DBaNQHj71ddBzSZ28YgbP1eaWxGiFPWsTZs/IlSLE9hUOUrx2gW9NGh4FRI4tdNxtJVYukguYQaYphy+0uxWEYnV8eRsY+leh1wbGvciLHm7VV4T3MJpFB6KMGW2UUURshQ0MY574fYVoYdNI9Nqnq7m8NULBHCWA1lNuKdcwBLt5+dqqtKuWbyGmgHtXElHEmEClQlUy1ia66+oewOKkf2MtY8GD7IIflQ0YD/UTURRhxMZbKovgonHGbqdjEFnthZifQPYV1/oR8B99dUXahIIzJTC/y2sTGKMiFhoS9QHF+TKJBpAqs4idX4HmtqNsM2MiMPWhXx4S2HLQjPj1NIoMk195hg8HX9GM0LEgDLutaYrBQKXQJwicsyqWbGPfWOUyiWdwxHLMMGu/EAU9S0DzG1tzTxZohIcC9MumsXZdqO5t7Ck5CMHV7CGoxWdjMeKxHttojuSegymvnhh3qK5ikxKyoqP61EzkGE50FGGqXmKS0TamU6bdtXpqLUGh9RmOXkzx4WDaY7eESDGbhaOGaSweBfGZ2VOEM3VA7DIt23G3oUiDq9YBREIEg29ShnrpxCh6NQCqPxOdXNuj4HzTq90vKIGcEJS7bu/vvrqEcC++uprttaw1bW9apH7Gkpfm7rmpUjMoOqKYjVr1e1IuOhua9LDNIFMIJJnhAlTyw7QFKHzRiCaQbghsqlWU2e3eHEbk8p5i6ivaZvVzKB9GmKMduqtxw1Sav0BE6bO3hi2/n5KGgWZg12BwLnvXxl9Io5NGT8nWEGyKFX0DMQzKKF/D5hrIgjuxY8EKDURc1dGqTS10SkoXZhMgwZheCyVjRlhIUCYUPt4FtEQU1UiU4ygp56CMyhegeICsSujVKuj/MLFbIIyEKksMlUSgwiUGheOSPZ3x4030SJTlbFx2MIgjhl5wwaKJtVCpd0GN5I9djDQ00RusNNwQptSZD9TtZURIWRlZIGjguQ+gH311VePAPbVV1/RAopugwih63KMN33R5zKyBZCSZ/C6b107Y7URi37l97mnXUo0NW8OnznnD6ZAqKLpKD8fwgwqo0ydtZ7xRd/FFClEEhmmPrpWE6RoAIonisa01s2R26mXn8Hj3lRgJCAeVP88IPKIEfm6lqej7JJrG80VeOBNqnlmMHhYvQ/VJHQqqQo5gOTUQoq4MwuvRKKaWhEqiRg1p6pItrBg8QY01LcFVYxO26pa2r/GzcA5m9KhGiRKEYRYGDtPeYQwH90yt245aHkm05lg2ZswLZsENRCaOBbJx6/SxTh/2oxaNeb28X1BV7NkcDT9BoKKAEgQ1YoGOjjpAhqPwpuag8MCkTaCiECyTF9LHSOUkkfcMIwKV6GvvvrqG8C++uoLOjZOZqwwz80NDh5F/BvDvJkjqfmzRQjhzYMjTRpZvRYCDCMrcbuhhg0RR3gBOsLmPnzeEkmgUmW0yzEy1Jnf40kaKaLHOKUqAqGEOiombpFSghE5+kSpNoAppWq0XDwLKbIliBLA5N6BKtUEuli9OHjXxGu2wWFTEDeVU4h4f1RUvsjROE45lNBoalMKxp03w2YAWgZBIh2kZNoGrzLEGGV8bUW0IYamGbhCV3L1E0ycoCnQRlPkSCQhFaSCNJJCDUhNC5U4R2wwa6LJi0Y/BSppxWyaAQgkW6CgGV3ZAEgHI0LbJLeoEQKaeG0xZAEGaYr4mqi/VzVQDnPwRBXI5eQ2LxQm0g5Sllg9gJIhRYNI6gITI2AAQtMkzLNirsV8f7f31VffAPbVV19RApZ7jrNpO8FG17Hn5PrIlznMlFmREk+VqNYhWHpQ7SAGGBLEFGpF7GHTUR27KINSjPGSN5XExcqkCEMYMEeNmB3hYQbYFKITZBXAXCjSJKq8PXAb5svh+UcTb64YaFILYnYOHDU+2iS3tUmcHKCMXFqCouEEQobKJhDNI4VABETgNACoBbgFpyEotQE1EphacBPZxoZQuE6m6upqLZMC/UtuIk0pxDQUfnzZETh142mIK3z9a8W+ZQDixo+9uo+fp6s5h9EV2xaIYIzedQKTCXK34XFrqi6mUT9/ilRH0y4Y0UBfvSFWicQP8aQRb2w1kgIFrtdgmHaegmwApHNEjhgiM1m/RhBVSAhsoHDhhhVjcpuKQ4zA5ApoMYEUJDPSTKykkSghu8sNElOo2427NkHT1jVgrb/h++rrAVDUH4K++vrclwH004tPeOg5coJyGhuGQwBzwDi+YQgAc5gDAIzin1JzGI1n/zt+aARgboS50dzst/q/trcJAOaIZfRx39EYa5oGGHB7wTDLiLbwgqwbunVp09jGvEOSsWLoLzmavsn6a0Yzf56bAzAaYzQHzGGI0WjmvZQ/YIQRAG5GtDCYH8ylMTWTY9oJCAMAkwk0DWw4nMASbHJ6mLWZs7n6ueaA4Q5/xTlgNPJX7NaNhAbDDaFWpKEdc9k20gLtXJh0TZe0mWPltVHWZqcBJ+91FEYYAWNgDiMAY4wAtLyZGrY0BjCXtpI2881k3Ha6ZpPxaIRRfJ65e52lUZyPOQxpvTEZpfWNseO8MrE2wTQPbZ248+/bUY/m7CUgltvxGFhXEI1yJ12wCof1cALjIUZDYK785BgYjUbT9zK691ka3+sTT6+wuZnzOZq9eABkNdqgJokZAWNsG69n4TYBw7lh7jbW1Si1CzI3c+ntOH8nNsbbj71k9Q0n+zu+r776BrCvvvrq636qNPNIC5/BvvCZawSFgPSxQXt99dVX3wD21Vdfn0otL5+Zqvv9H/Pvz+R1Zv/Bx3nd/Z/x71n+BF9fAfZ/TGeyf/nTeL6t3Kfjtf+T/D0+zb87466LlX/e6e1f/uRrxv4VFJ1zX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1+fhaL+EPTVV1999dXX/VNmIOxfJuy9gbDnCjqEQ8Ch6d/v2zf73fuAfVBgxUAAAdYfwb4+1w3gx379s3LRGUAwgOiz+7p9ff6uG/vnX7RPdv77B9gnP672MUeH6NM7XmagT/dn+vrUnl1ULm6bXvD08R6SVv/O7lNzcO/X7c/lA7rZW2YcAuOeGwxLqxqXjX1mzSMIexcJAHhpVfoLpK/PaCG/L4vGJ1rMywPsU20KPnbhKk3i7APUZp+Hy6DVvYu0Z8/dtA/7cAiHsG/fYekXvc/hQ2x5mbF/vzH9s/7kX/wZIrK+EbzvdXB5udm3f7+U42hm/2zT9vGOcV+fwQILw+zx9g0rfQaLttFneo78fS0TVm8gLAKHDt1N++45z7C4qrGh7q+BM+X6WV3kVQBLS6vy8b7nLW9Z3r3z6I0XzQ23PXbbAHvy0TtpfOLmlPMYxPMd0HZpbgd4uA1z23Yjd6f/Kd91+MZLzpcRPeeOjY/5jWQg4MAn/50P+k31x/QTBJiZ0f79+2n/yop9TFNkn9r9+Cl2WPbPN/K1T7Lp96wugRcXgUPXX0UAcAiHdWUFev8hgAQsKxiHrmLccx4DwNvvuIAuferj9PiVu/QArrf9AFZ4RT+txw0BpqAPfvCrB+97X5NGo/l8/GG7bNeVx3UJBxSf9OFI995yf4JfbAZaXQUvYhHxUOwfiJ+j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X3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311VdfffXVV1999dVXX3311denZFF/CPrq68EpM9D+/f/2ntv/EX9yEcBS/O/HWfvP7WO4snIjLSxcbg/4s+//ZByfpY/zUy3W37P/E3yK9n+Ev38gr7XnRtDC5bAP9rNLSzAA1t/tffXVV1999dVXX3311Vdf6BHAvvr6tKzblr/okot37RxurI4NmMV40PBsKzSxs4nGbaJkNOEBDYcTtCqMyTa0I6OkzWCcRRvMi82TWW50CGDCDUHZwErJ2gQMMZxRWt9kzon5kjnZHGICjABgCJDSiAY0wSDeUQsAGA7YVnNm0zkdy2BeWm40yUQzZNCwNTySibJhpDQEQDnRuBEjTkTSpIGx7TqvHSNtpsnGahpSQxNjG1IiMHHLSIOm0YmxIW8SBvMY8mxuJzbYmIwGmzrYZE0J+SxZggIDDGlMaAEMgKwpgYQ2xyklpuHczrS5Y9BOQOs8sVaHMpMhLGNLNhpOgAkA2qAJZ0a7SUOBrLYNSdvMTjJkkBqdtC2gbAMAxEoTZQNaTFrA2qFoGisAjGiTds1LizGA0Rg4O8IkMZO1qZ2sJfCYKE9ooGQTTEAbRmstsJln0vqm0kZGboasTZMtaRJryNpsNGhmbBJnYZQbomSULbFsnpF5XTPKYzJpDQBIjGjDiGaN1ifG0hoP4uyZkLUyoQ1Lg3GbddQMNRnpOLUmNtQ0ZJ1MgCaTrU7GmEtkujbmwdxcGs3MyPr4pPKGETegJsMwAXJT1oUhNE9sggkm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";

// src/worker.js
var LOGO_BYTES = null;
function qrSvgs(origin, n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    const q = (0, import_qrcode_generator.default)(0, "M");
    q.addData(origin + "/g/" + i);
    q.make();
    out.push(q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }));
  }
  return out;
}
__name(qrSvgs, "qrSvgs");
var SCHEMA = [
  "CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY CHECK (id=1), rnd INTEGER NOT NULL, phase TEXT NOT NULL, deadline INTEGER NOT NULL, revealed TEXT NOT NULL, view TEXT NOT NULL)",
  "INSERT OR IGNORE INTO state VALUES (1, 0, 'lobby', 0, '[]', 'round')",
  "CREATE TABLE IF NOT EXISTS subs (grp INTEGER NOT NULL, rnd INTEGER NOT NULL, choice TEXT, num REAL, tokens INTEGER, note TEXT, extra TEXT, ts INTEGER NOT NULL, PRIMARY KEY (grp, rnd))",
  "CREATE TABLE IF NOT EXISTS teams (grp INTEGER PRIMARY KEY, name TEXT NOT NULL)"
];
var schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch(SCHEMA.map((s) => db.prepare(s)));
  schemaReady = true;
}
__name(ensureSchema, "ensureSchema");
var json = /* @__PURE__ */ __name((o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } }), "json");
var html = /* @__PURE__ */ __name((h) => new Response(h, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } }), "html");
var nGroups = /* @__PURE__ */ __name((env) => parseInt(env.NUM_GROUPS || "10", 10), "nGroups");
function publicRound(r) {
  if (!r) return null;
  const { id, code, kind, minutes, title, topic, context, table, answers, question, options, numLabel, numUnit, extra, noteLabel, prompt } = r;
  return { id, code, kind, minutes, title, topic, context, table, answers, question, options, numLabel, numUnit, extra, noteLabel, prompt };
}
__name(publicRound, "publicRound");
async function getState(db) {
  const s = await db.prepare("SELECT * FROM state WHERE id=1").first();
  return { rnd: s.rnd, phase: s.phase, deadline: s.deadline, revealed: JSON.parse(s.revealed), view: s.view };
}
__name(getState, "getState");
function scoreSub(sub, rnd) {
  const k = KEY[rnd];
  if (!k || !sub) return { pts: 0, correct: null, numOk: false };
  const t = Math.min(3, Math.max(1, sub.tokens || 1));
  const correct = sub.choice === k.answer;
  let pts = correct ? SCORING.right * t : SCORING.wrong * t;
  const numOk = sub.num !== null && sub.num !== void 0 && Math.abs(sub.num - k.num) <= Math.abs(k.num) * k.tol;
  if (numOk) pts += SCORING.numBonus;
  return { pts, correct, numOk };
}
__name(scoreSub, "scoreSub");
async function computeBoard(db, env, revealed) {
  const N = nGroups(env);
  const subs = (await db.prepare("SELECT * FROM subs").all()).results;
  const names = Object.fromEntries((await db.prepare("SELECT * FROM teams").all()).results.map((t) => [t.grp, t.name]));
  const teams = [];
  for (let g = 1; g <= N; g++) teams.push({ grp: g, name: names[g] || "Zesp\xF3\u0142 " + String(g).padStart(2, "0"), total: 0, prev: 0, perRound: {} });
  const order = revealed.slice();
  const last = order[order.length - 1];
  let confRight = [0, 0], confWrong = [0, 0];
  for (const s of subs) {
    if (!order.includes(s.rnd) || !KEY[s.rnd]) continue;
    const tm = teams[s.grp - 1];
    if (!tm) continue;
    const r = scoreSub(s, s.rnd);
    tm.perRound[s.rnd] = r;
    tm.total += r.pts;
    if (s.rnd !== last) tm.prev += r.pts;
    if (r.correct) {
      confRight[0] += s.tokens;
      confRight[1]++;
    } else {
      confWrong[0] += s.tokens;
      confWrong[1]++;
    }
  }
  const rank = /* @__PURE__ */ __name((arr, key) => {
    const sorted = arr.slice().sort((a, b) => b[key] - a[key]);
    const pos = {};
    sorted.forEach((t, i) => pos[t.grp] = i + 1);
    return pos;
  }, "rank");
  const now = rank(teams, "total"), before = rank(teams, "prev");
  teams.forEach((t) => {
    t.place = now[t.grp];
    t.jump = order.length > 1 ? before[t.grp] - now[t.grp] : 0;
  });
  return {
    teams: teams.sort((a, b) => b.total - a.total || a.grp - b.grp),
    confidence: {
      right: confRight[1] ? +(confRight[0] / confRight[1]).toFixed(2) : null,
      wrong: confWrong[1] ? +(confWrong[0] / confWrong[1]).toFixed(2) : null
    }
  };
}
__name(computeBoard, "computeBoard");
async function roundStats(db, rnd) {
  const subs = (await db.prepare("SELECT grp, choice, num, tokens, note, extra FROM subs WHERE rnd=?").bind(rnd).all()).results;
  const dist = {}, tok = {}, extra = {};
  for (const s of subs) {
    if (s.choice) {
      dist[s.choice] = (dist[s.choice] || 0) + 1;
      tok[s.choice] = (tok[s.choice] || 0) + (s.tokens || 0);
    }
    if (s.extra) extra[s.extra] = (extra[s.extra] || 0) + 1;
  }
  return { submitted: subs.map((s) => s.grp), dist, tok, extra, subs };
}
__name(roundStats, "roundStats");
async function api(req, env, url) {
  const db = env.DB;
  const p = url.pathname;
  if (p === "/api/state") {
    const g = parseInt(url.searchParams.get("g"), 10);
    const st = await getState(db);
    const r = ROUNDS[st.rnd];
    const out = { now: Date.now(), state: st, round: st.phase === "lobby" ? null : publicRound(r) };
    if (g >= 1 && g <= nGroups(env)) {
      const mine = await db.prepare("SELECT * FROM subs WHERE grp=? AND rnd=?").bind(g, st.rnd).first();
      const team = await db.prepare("SELECT name FROM teams WHERE grp=?").bind(g).first();
      out.team = team ? team.name : "Zesp\xF3\u0142 " + String(g).padStart(2, "0");
      out.mine = mine || null;
      if (st.revealed.includes(st.rnd) && KEY[st.rnd]) {
        out.result = { ...scoreSub(mine, st.rnd), answer: KEY[st.rnd].answer, num: KEY[st.rnd].num, explain: KEY[st.rnd].explain };
      }
      if (st.revealed.length) {
        const b = await computeBoard(db, env, st.revealed);
        const me = b.teams.find((t) => t.grp === g);
        out.total = me.total;
        out.place = me.place;
      }
    }
    return json(out);
  }
  if (p === "/api/submit" && req.method === "POST") {
    const b = await req.json().catch(() => ({}));
    const g = parseInt(b.g, 10);
    if (!(g >= 1 && g <= nGroups(env))) return json({ ok: false, err: "Nieprawid\u0142owy numer zespo\u0142u." }, 400);
    const st = await getState(db);
    if (st.phase !== "open" || b.rnd !== st.rnd) return json({ ok: false, err: "Runda jest zamkni\u0119ta." }, 409);
    const r = ROUNDS[st.rnd];
    const choice = r.options.some((o) => o.k === b.choice) ? b.choice : null;
    if (!choice) return json({ ok: false, err: "Wybierzcie odpowied\u017A." }, 400);
    let num = null;
    if (r.numLabel && b.num !== void 0 && b.num !== null && String(b.num).trim() !== "") {
      num = parseFloat(String(b.num).replace(/\s/g, "").replace(",", "."));
      if (!isFinite(num)) return json({ ok: false, err: "Liczba ma nieprawid\u0142owy format." }, 400);
    }
    const tokens = r.kind === "decision" ? Math.min(3, Math.max(1, parseInt(b.tokens, 10) || 1)) : 0;
    const extra = r.extra && r.extra.options.some((o) => o.k === b.extra) ? b.extra : null;
    const note = (b.note || "").toString().slice(0, 140);
    if (r.kind === "final" && note.trim().length < 5) return json({ ok: false, err: "Opiszcie jedn\u0105 rzecz do przetestowania." }, 400);
    const stmts = [db.prepare("INSERT INTO subs (grp,rnd,choice,num,tokens,note,extra,ts) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(grp,rnd) DO UPDATE SET choice=excluded.choice,num=excluded.num,tokens=excluded.tokens,note=excluded.note,extra=excluded.extra,ts=excluded.ts").bind(g, st.rnd, choice, num, tokens, note, extra, Date.now())];
    if (r.kind === "warmup" && b.name && b.name.trim()) stmts.push(db.prepare("INSERT INTO teams (grp,name) VALUES (?,?) ON CONFLICT(grp) DO UPDATE SET name=excluded.name").bind(g, b.name.trim().slice(0, 24)));
    await db.batch(stmts);
    return json({ ok: true });
  }
  if (p === "/api/screen") {
    const st = await getState(db);
    const r = ROUNDS[st.rnd];
    const stats = await roundStats(db, st.rnd);
    const board = await computeBoard(db, env, st.revealed);
    const out = { now: Date.now(), state: st, n: nGroups(env), round: publicRound(r), submitted: stats.submitted, board };
    if (st.phase !== "open" || r.kind !== "decision") {
      out.dist = stats.dist;
      out.tok = stats.tok;
    }
    if (st.revealed.includes(st.rnd) && KEY[st.rnd]) {
      out.key = KEY[st.rnd];
      out.extra = stats.extra;
      out.roundPts = Object.fromEntries(board.teams.map((t) => [t.grp, t.perRound[st.rnd] ? t.perRound[st.rnd].pts : 0]));
    }
    if (r.kind === "final" && st.phase !== "open") out.notes = stats.subs.filter((s) => s.note).map((s) => ({ grp: s.grp, area: s.choice, note: s.note }));
    if (st.view === "podium") {
      const fin = await roundStats(db, 7);
      out.notes = fin.subs.filter((s) => s.note).map((s) => ({ grp: s.grp, area: s.choice, note: s.note }));
      out.areas = fin.dist;
      out.mandate = (await roundStats(db, 6)).extra;
    }
    return json(out);
  }
  if (p === "/api/admin" && req.method === "POST") {
    const b = await req.json().catch(() => ({}));
    if (!env.ADMIN_KEY) return json({ ok: false, err: "Brak sekretu ADMIN_KEY w ustawieniach Workera (Cloudflare \u2192 Settings \u2192 Variables and secrets)." }, 503);
    if (b.key !== env.ADMIN_KEY) return json({ ok: false, err: "Nieprawid\u0142owy klucz \u2013 wpisz klucz i kliknij Zapisz." }, 403);
    const st = await getState(db);
    const set = /* @__PURE__ */ __name((o) => db.prepare("UPDATE state SET rnd=?, phase=?, deadline=?, revealed=?, view=? WHERE id=1").bind(o.rnd ?? st.rnd, o.phase ?? st.phase, o.deadline ?? st.deadline, JSON.stringify(o.revealed ?? st.revealed), o.view ?? st.view).run(), "set");
    switch (b.action) {
      case "open": {
        const rnd = parseInt(b.rnd, 10);
        if (!ROUNDS[rnd]) return json({ ok: false, err: "Brak rundy." }, 400);
        const min = parseFloat(b.minutes) || ROUNDS[rnd].minutes;
        await set({ rnd, phase: "open", deadline: Date.now() + min * 6e4, view: "round", revealed: st.revealed.filter((x) => x !== rnd) });
        break;
      }
      case "extend":
        await set({ deadline: Math.max(Date.now(), st.deadline) + 6e4 });
        break;
      case "close":
        await set({ phase: "closed" });
        break;
      case "reveal":
        await set({ phase: "revealed", revealed: KEY[st.rnd] && !st.revealed.includes(st.rnd) ? [...st.revealed, st.rnd] : st.revealed });
        break;
      case "view":
        await set({ view: b.view === "podium" ? "podium" : b.view === "board" ? "board" : "round" });
        break;
      case "lobby":
        await set({ phase: "lobby", view: "round" });
        break;
      case "delete":
        await db.prepare("DELETE FROM subs WHERE grp=? AND rnd=?").bind(parseInt(b.g, 10), st.rnd).run();
        break;
      case "reset":
        if (b.confirm !== "RESET") return json({ ok: false, err: "Wpisz RESET." }, 400);
        await db.batch([db.prepare("DELETE FROM subs"), db.prepare("DELETE FROM teams"), db.prepare("UPDATE state SET rnd=0, phase='lobby', deadline=0, revealed='[]', view='round' WHERE id=1")]);
        break;
      case "peek": {
        const stats = await roundStats(db, st.rnd);
        return json({ ok: true, state: st, subs: stats.subs, key: KEY[st.rnd] || null, rounds: ROUNDS.map((r) => ({ id: r.id, code: r.code, title: r.title, minutes: r.minutes })) });
      }
      default:
        return json({ ok: false, err: "Nieznana akcja." }, 400);
    }
    return json({ ok: true });
  }
  if (p === "/api/export") {
    if (!env.ADMIN_KEY || url.searchParams.get("key") !== env.ADMIN_KEY) return json({ ok: false }, 403);
    const subs = (await db.prepare("SELECT s.*, t.name FROM subs s LEFT JOIN teams t ON t.grp=s.grp ORDER BY rnd, grp").all()).results;
    const head = "runda;zespol;nazwa;wybor;liczba;zetony;mandat;notatka;punkty;czas";
    const rows = subs.map((s) => [ROUNDS[s.rnd].code, s.grp, s.name || "", s.choice || "", s.num ?? "", s.tokens ?? "", s.extra || "", (s.note || "").replace(/[;\n]/g, " "), KEY[s.rnd] ? scoreSub(s, s.rnd).pts : "", new Date(s.ts).toISOString()].join(";"));
    return new Response("\uFEFF" + [head, ...rows].join("\n"), { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=gielda_elplus_wyniki.csv" } });
  }
  return json({ ok: false, err: "Nie znaleziono." }, 404);
}
__name(api, "api");
var worker_default = {
  async fetch(req, env) {
    const url = new URL(req.url);
    await ensureSchema(env.DB);
    if (url.pathname.startsWith("/api/")) return api(req, env, url);
    const m = url.pathname.match(/^\/g\/(\d{1,2})\/?$/);
    if (m) {
      const g = parseInt(m[1], 10);
      if (g < 1 || g > nGroups(env)) return new Response("Nieprawid\u0142owy numer zespo\u0142u", { status: 404 });
      return html(PAGE_TEAM.replaceAll("__G__", String(g)));
    }
    if (url.pathname === "/screen") return html(PAGE_SCREEN.replace("__QR__", JSON.stringify(qrSvgs(url.origin, nGroups(env)))));
    if (url.pathname === "/logo.png") {
      if (!LOGO_BYTES) LOGO_BYTES = Uint8Array.from(atob(LOGO_PNG_B64), (c) => c.charCodeAt(0));
      return new Response(LOGO_BYTES, { headers: { "content-type": "image/png", "cache-control": "public, max-age=86400" } });
    }
    if (url.pathname === "/admin") return html(PAGE_ADMIN);
    if (url.pathname === "/qr") {
      let cards = "";
      for (let i = 1; i <= nGroups(env); i++) {
        const u = url.origin + "/g/" + i, q = (0, import_qrcode_generator.default)(0, "M");
        q.addData(u);
        q.make();
        cards += "<div class=c><h2>Zesp\xF3\u0142 " + String(i).padStart(2, "0") + "</h2>" + q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }) + "<small>" + u + "</small></div>";
      }
      return html(PAGE_QR.replace("__CARDS__", cards));
    }
    if (url.pathname === "/") return html("<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><body style='font-family:system-ui;background:#111214;color:#f5f1e8;padding:2rem'><img src='/logo.png' style='height:40px'><h1>Gie\u0142da decyzji ELPLUS</h1><p>Zeskanujcie kod QR swojego zespo\u0142u.</p></body>");
    return new Response("Nie znaleziono", { status: 404 });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
