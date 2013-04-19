// Generated by CoffeeScript 1.6.2
(function() {
  var Chocokup, Coffeekup, _module,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Coffeekup = require('./coffeekup');

  Chocokup = (function() {
    function Chocokup(params, content) {
      this.params = params;
      this.content = content;
      if (this.content === void 0) {
        this.content = this.params;
        this.params = void 0;
      }
    }

    Chocokup.prototype.head_template = function() {
      return text("" + this.body);
    };

    Chocokup.prototype.body_template = function() {
      return text("" + this.content);
    };

    Chocokup.helpers = {
      verify: function() {
        var a, args, attributes, content, id_class, _i, _len;

        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        attributes = content = null;
        id_class = '';
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          a = args[_i];
          switch (typeof a) {
            case 'function':
              content = a;
              break;
            case 'object':
              attributes = a;
              break;
            case 'number':
            case 'boolean':
              content = a;
              break;
            case 'string':
              if (args.length === 1) {
                content = a;
              } else {
                if (a === args[0]) {
                  id_class = a;
                } else {
                  content = a;
                }
              }
          }
        }
        return {
          id_class: id_class,
          attributes: attributes,
          content: content
        };
      },
      panel: function() {
        var attributes, content, content_, flush, id_class, new_id_class, orientation_keep, panel_index_keep, proportion_keep, _ref, _ref1, _ref2, _ref3,
          _this = this;

        _ref = verify.apply(null, arguments), id_class = _ref.id_class, attributes = _ref.attributes, content = _ref.content;
        switch (this.proportion) {
          case 'half':
          case 'third':
          case 'half-served':
            if (this.orientation === 'vertical') {
              new_id_class = "space." + this.proportion + ".vertical";
              switch (this.panel_index) {
                case 1:
                  new_id_class += '.top';
                  break;
                case 2:
                  new_id_class += (_ref1 = this.proportion) === 'half' || _ref1 === 'half-served' ? '.bottom' : '.middle';
                  break;
                case 3:
                  new_id_class += '.bottom';
              }
            } else {
              new_id_class = "space." + this.proportion + ".horizontal";
              switch (this.panel_index) {
                case 1:
                  new_id_class += '.left';
                  break;
                case 2:
                  new_id_class += (_ref2 = this.proportion) === 'half' || _ref2 === 'half-served' ? '.right' : '.center';
                  break;
                case 3:
                  new_id_class += '.right';
              }
            }
            break;
          case 'served':
            if (this.orientation === 'vertical') {
              new_id_class = 'space.service.vertical';
              switch (this.panel_index) {
                case 1:
                  new_id_class += '.top';
                  break;
                case 2:
                  new_id_class += '.served.center';
                  break;
                case 3:
                  new_id_class += '.bottom';
              }
            } else {
              new_id_class = 'space.service.horizontal';
              switch (this.panel_index) {
                case 1:
                  new_id_class += '.left';
                  break;
                case 2:
                  new_id_class += '.served.center';
                  break;
                case 3:
                  new_id_class += '.right';
              }
            }
            break;
          default:
            new_id_class = 'space';
        }
        panel_index_keep = this.panel_index;
        proportion_keep = this.proportion;
        orientation_keep = this.orientation;
        this.panel_index = 1;
        if ((_ref3 = this.panel_infos) == null) {
          this.panel_infos = [];
        }
        this.panel_infos.push({});
        this.proportion = 'none';
        this.orientation = 'none';
        if (attributes != null) {
          if (attributes.coverage) {
            new_id_class += (new_id_class !== '' ? '.' : '') + 'screen-' + attributes.coverage;
          }
          if (attributes.proportion != null) {
            this.proportion = attributes.proportion;
          }
          if (attributes.orientation != null) {
            this.orientation = attributes.orientation;
          }
          delete attributes.proportion;
          delete attributes.orientation;
          delete attributes.coverage;
        }
        id_class = new_id_class + (id_class !== '' ? '.' : '') + id_class;
        flush = function() {
          var panel_info, _ref4;

          if ((panel_info = this.panel_infos[this.panel_infos.length - 1]).footer_kept != null) {
            _ref4 = panel_info.footer_kept, id_class = _ref4.id_class, attributes = _ref4.attributes, content = _ref4.content;
            panel(id_class, attributes, content);
            return panel_info.footer_kept = void 0;
          }
        };
        content_ = typeof content === "function" ? function() {
          content.apply(_this);
          return flush.apply(_this);
        } : content;
        if (proportion_keep !== 'none' && this.proportion === 'none') {
          div(id_class, function() {
            return div('space', attributes, content_);
          });
        } else {
          div(id_class, attributes, content_);
        }
        this.panel_index = panel_index_keep + 1;
        this.proportion = proportion_keep;
        this.orientation = orientation_keep;
        return this.panel_infos.pop();
      },
      box: function() {
        var attributes, content, id_class, _ref;

        _ref = verify.apply(null, arguments), id_class = _ref.id_class, attributes = _ref.attributes, content = _ref.content;
        id_class = 'frame' + (id_class !== '' ? '.' : '') + id_class;
        return panel(id_class, attributes, function() {
          return panel('sizer', content);
        });
      },
      header: function() {
        var attributes, content, id_class, panel_info, _ref;

        _ref = verify.apply(null, arguments), id_class = _ref.id_class, attributes = _ref.attributes, content = _ref.content;
        if ((attributes != null ? attributes.html5 : void 0) != null) {
          return tag.apply(null, ['header'].concat(__slice.call(arguments)));
        } else {
          panel_info = this.panel_infos[this.panel_infos.length - 1];
          panel_info.hasHeader = true;
          id_class = 'header' + (id_class !== '' ? '.' : '') + id_class;
          if ((attributes != null ? attributes.by : void 0) != null) {
            id_class += '.by-' + attributes.by;
            panel_info.header_by = attributes.by;
          }
          return panel(id_class, attributes, content);
        }
      },
      footer: function() {
        var attributes, content, id_class, panel_info, _ref;

        _ref = verify.apply(null, arguments), id_class = _ref.id_class, attributes = _ref.attributes, content = _ref.content;
        if ((attributes != null ? attributes.html5 : void 0) != null) {
          return tag.apply(null, ['footer'].concat(__slice.call(arguments)));
        } else {
          panel_info = this.panel_infos[this.panel_infos.length - 1];
          panel_info.hasFooter = true;
          id_class = 'footer' + (id_class !== '' ? '.' : '') + id_class;
          if ((attributes != null ? attributes.by : void 0) != null) {
            id_class += '.by-' + attributes.by;
            panel_info.footer_by = attributes.by;
          }
          return panel_info.footer_kept = {
            id_class: id_class,
            attributes: attributes,
            content: content
          };
        }
      },
      body: function() {
        var attributes, content, count, id_class, new_id_class, panel_info, _ref, _ref1;

        _ref = verify.apply(null, arguments), id_class = _ref.id_class, attributes = _ref.attributes, content = _ref.content;
        if (((_ref1 = this.panel_infos) != null ? _ref1.length : void 0) > 0) {
          new_id_class = 'body';
          panel_info = this.panel_infos[this.panel_infos.length - 1];
          if (panel_info.hasHeader !== true) {
            new_id_class += '.no-header';
          }
          if (panel_info.hasFooter !== true) {
            new_id_class += '.no-footer';
          }
          if (count = panel_info.header_by) {
            new_id_class += ".with-" + count + "-headers";
          }
          if (count = panel_info.footer_by) {
            new_id_class += ".with-" + count + "-footers";
          }
          id_class = new_id_class + (id_class !== '' ? '.' : '') + id_class;
          return panel(id_class, attributes, content);
        } else {
          this.main_body_done = true;
          return tag.apply(null, ['body'].concat(__slice.call(arguments)));
        }
      },
      title: function() {
        var attributes, content, id_class, _ref, _ref1;

        _ref = verify.apply(null, arguments), id_class = _ref.id_class, attributes = _ref.attributes, content = _ref.content;
        if (this.main_body_done != null) {
          if (attributes == null) {
            attributes = {};
          }
          attributes.style = ((_ref1 = attributes.style) != null ? _ref1 : '') + 'text-align:center;';
          return h3(id_class, attributes, content);
        } else {
          return tag.apply(null, ['title'].concat(__slice.call(arguments)));
        }
      }
    };

    Chocokup.prototype.render = function(options) {
      var body_html, content_html, format, head_html, helpers, k, locals, v, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;

      locals = (_ref = options != null ? options.locals : void 0) != null ? _ref : {};
      if (((_ref1 = this.params) != null ? _ref1.locals : void 0) != null) {
        _ref2 = this.params.locals;
        for (k in _ref2) {
          v = _ref2[k];
          locals[k] = v;
        }
        delete this.params.locals;
      }
      if (Object.prototype.toString.apply(locals) !== '[object Object]') {
        locals = {
          locals: locals
        };
      }
      locals.backdoor_key = options != null ? options.backdoor_key : void 0;
      helpers = Chocokup.helpers;
      if (((_ref3 = this.params) != null ? _ref3.helpers : void 0) != null) {
        _ref4 = this.params.helpers;
        for (k in _ref4) {
          v = _ref4[k];
          helpers[k] = v;
        }
        delete this.params.helpers;
      }
      format = (_ref5 = options != null ? options.format : void 0) != null ? _ref5 : true;
      content_html = Coffeekup.render(this.content, {
        panel_index: 1,
        webcontrol_index: 0,
        proportion: 'none',
        orientation: 'none',
        hardcode: helpers,
        params: this.params,
        format: format,
        locals: locals
      });
      body_html = Coffeekup.render(this.body_template, {
        content: content_html,
        title: this.title,
        panel_index: 1,
        proportion: 'none',
        orientation: 'none',
        hardcode: helpers,
        params: this.params,
        format: format,
        locals: locals
      });
      head_html = Coffeekup.render(this.head_template, {
        body: body_html,
        title: this.title,
        panel_index: 1,
        proportion: 'none',
        orientation: 'none',
        hardcode: helpers,
        params: this.params,
        format: format,
        locals: locals
      });
      if (head_html === void 0) {
        return 'None';
      } else {
        return '' + head_html;
      }
    };

    return Chocokup;

  })();

  Chocokup.Document = (function(_super) {
    __extends(Document, _super);

    function Document(title, params, content) {
      this.title = title;
      this.params = params;
      this.content = content;
      Document.__super__.constructor.call(this, this.params, this.content);
    }

    Document.prototype.head_template = function() {
      var _ref;

      doctype(5);
      return html({
        manifest: "" + (((_ref = this.params) != null ? _ref.manifest : void 0) || '')
      }, function() {
        head(function() {
          title("" + (this.title || 'Untitled'));
          meta({
            name: "viewport",
            content: "user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"
          });
          meta({
            name: "viewport",
            content: "initial-scale=1.0,user-scalable=no,maximum-scale=1",
            media: "(device-height: 568px)"
          });
          meta({
            name: "apple-mobile-web-app-capable",
            content: "yes"
          });
          return style('html, body {\n  margin:0;\n  padding:0;\n  overflow: hidden;\n  height: 100%;\n}\n              \n.space {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: auto;\n  height: auto;\n  overflow: hidden;\n}\n.hidden {\n  display:none;\n}\n.screen-95 {\n  left: 5%;\n  top: 2%;\n  width: 90%;\n  height: 96%;\n}\n.screen-90 {\n  left: 10%;\n  top: 4%;\n  width: 80%;\n  height: 92%;\n}\n.screen-85 {\n  left: 15%;\n  top: 6%;\n  width: 70%;\n  height: 88%;\n}\n.screen-80 {\n  left: 20%;\n  top: 8%;\n  width: 60%;\n  height: 84%;\n}\n.top {\n  top: 0;\n  bottom: auto;\n}\n.third.vertical.middle {\n  top: 33.33%;\n}\n.bottom {\n  top: auto;\n  bottom: 0;\n}\n.left {\n  left: 0;\n  right: auto;\n}\n.third.horizontal.center {\n  left: 33.33%;\n}\n.right {\n  left: auto;\n  right: 0;\n}\n.half.horizontal {\n  width: 50%;\n}\n.half.vertical {\n  height: 50%;\n}\n.half-served.horizontal.left {\n  width: 80%;\n}\n.half-served.vertical.top {\n  height: 80%;\n}\n.half-served.horizontal.right {\n  width: 20%;\n}\n.half-served.vertical.bottom {\n  height: 20%;\n}\n.third.horizontal {\n  width: 33.33%;\n}\n.third.vertical {\n  height: 33.33%;\n}\n.service.horizontal {\n  width: 20%;\n}\n.fullscreen > .service.horizontal {\n  width: 0%;\n}\n.service.vertical {\n  height: 20%;\n}\n.fullscreen > .service.vertical {\n  height: 0%;\n}\n.served.horizontal {\n  left: 20%;\n  width: 60%;\n  right: 20%;\n}\n.fullscreen > .served.horizontal {\n  left: 0%;\n  width: 100%;\n  right: 0%;\n}\n.served.vertical {\n  top: 20%;\n  height: 60%;\n  bottom: 20%;\n}\n.fullscreen > .served.vertical {\n  top: 0%;\n  height: 100%;\n  bottom: 0%;\n}\n.fullscreen.shrink {\n  width: 0%;\n  height: 0%;\n}\n.shrink.horizontal {\n  width: 0%;\n}\n.shrink.vertical {\n  height: 0%;\n}\n.fullscreen.expand {\n  width: 100%;\n  height: 100%;\n}\n.expand.horizontal {\n  width: 100%;\n}\n.expand.vertical {\n  height: 100%;\n}\n.source-code {\n  white-space: pre;\n}\n.float-left {\n  float: left;\n  margin-left: 10px;\n}\n.float-right {\n  float: right;\n  margin-right: 10px;\n}\n.header {\n  position: absolute;\n  height:32px;\n  width:100%;\n  overflow:hidden;\n  top: 0px;\n  bottom: auto;\n  text-align:center;\n  line-height: 32px;\n  /*\n  background:#ddd;\n  border-bottom:solid 1px #666;\n  */\n}\n.body {\n  overflow:auto;\n  -webkit-overflow-scrolling:touch;\n  top:32px;\n  bottom:32px;\n  position:absolute;\n}\n.footer {\n  position: absolute;\n  height:32px;\n  width:100%;\n  overflow:hidden;\n  top: auto;\n  bottom: 0px;\n  text-align:center;\n  line-height: 32px;\n  /*\n  background:#ddd;\n  border-top:solid 1px #666;\n  */\n}\n.no-header {\n  top:0px;\n}\n.no-footer {\n  bottom:0px;\n}\n.header.by-bootstrap, .footer.by-bootstrap {\n  height:40px;\n  line-height: inherit;\n  margin: 0;\n  padding: 0;\n}\n.header.by-2, .footer.by-2 {\n  height:64px;\n}\n.header.by-3, .footer.by-3 {\n  height:96px;\n}\n.header.by-4, .footer.by-4 {\n  height:128px;\n}\n.header.by-5, .footer.by-5 {\n  height:160px;\n}\n.header.by-10, .footer.by-10 {\n  height:320px;\n}\n.with-bootstrap-headers {\n  top:40px;\n}\n.with-2-headers {\n  top:64px;\n}\n.with-3-headers {\n  top:96px;\n}\n.with-4-headers {\n  top:128px;\n}\n.with-5-headers {\n  top:160px;\n}\n.with-10-headers {\n  top:320px;\n}\n.with-bootstrap-footers {\n  bottom:40px;\n}\n.with-2-footers {\n  bottom:64px;\n}\n.with-3-footers {\n  bottom:96px;\n}\n.with-4-footers {\n  bottom:128px;\n}\n.with-5-footers {\n  bottom:160px;\n}\n.with-10-footers {\n  bottom:320px;\n}\n.inline {\n  position:relative;\n}\n.scroll * {\n  overflow: auto;\n  -webkit-overflow-scrolling:touch;\n}\n.no-scroll * {\n  overflow: hidden;\n}\n* html .body {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n}');
        });
        return text("" + this.body);
      });
    };

    Document.prototype.body_template = function() {
      return text("" + this.content);
    };

    return Document;

  })(Chocokup);

  Chocokup.Panel = (function(_super) {
    __extends(Panel, _super);

    function Panel(params, content) {
      this.params = params;
      this.content = content;
      Panel.__super__.constructor.call(this, this.params, this.content);
      if (this.params == null) {
        this.params = {};
      }
    }

    return Panel;

  })(Chocokup);

  Chocokup.Kups = {
    Tablet: function() {
      style(".chocoblack {\n    background-color: #241A15;\n    border: 1px solid #080401;\n    -webkit-box-shadow: inset 0 0 15px #080401;\n    -moz-box-shadow: inset 0 0 15px #080401;\n    -o-box-shadow: inset 0 0 15px #080401;\n    box-shadow: inset 0 0 15px #080401;           \n}\n.chocomilk {\n    background-color:rgb(245, 242, 232);\n    border: 2px solid rgba(255, 204, 0, 0.3);\n    color: rgb(92, 75, 68);\n}\n.frame.chocomilk.round {\n    -webkit-box-shadow: inset 0 0 20px #080401;\n    -moz-box-shadow: inset 0 0 20px #080401;\n    -o-box-shadow: inset 0 0 20px #080401;\n    box-shadow: inset 0 0 20px #080401;    \n} ");
      return panel("#.chocoblack", {
        proportion: 'third'
      }, function() {
        panel(function() {
          return panel({
            proportion: 'third',
            orientation: 'vertical'
          }, function() {
            panel(function() {
              return box("#.chocoblack", "");
            });
            panel(function() {
              return box("#.chocoblack", "");
            });
            return panel(function() {
              return box("#.chocoblack", "");
            });
          });
        });
        panel(function() {
          return panel({
            proportion: 'third',
            orientation: 'vertical'
          }, function() {
            panel(function() {
              return box("#.chocoblack", "");
            });
            panel(function() {
              return box("#.chocomilk.round", function() {
                return table('#.fullscreen.expand', function() {
                  return td({
                    style: 'text-align:center;vertical-align:middle;'
                  }, function() {
                    return kup();
                  });
                });
              });
            });
            return panel(function() {
              return box("#.chocoblack", "");
            });
          });
        });
        return panel(function() {
          return panel({
            proportion: 'third',
            orientation: 'vertical'
          }, function() {
            panel(function() {
              return box("#.chocoblack", "");
            });
            panel(function() {
              return box("#.chocoblack", "");
            });
            return panel(function() {
              return box("#.chocoblack", "");
            });
          });
        });
      });
    }
  };

  Chocokup.Css = (function() {
    function Css() {}

    Css.prefix = function(css) {
      var p;

      return ((function() {
        var _i, _len, _ref, _results;

        _ref = ['-webkit-', '-moz-', '-o-', '-ms-', ''];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(css.replace(/-\?-/g, p));
        }
        return _results;
      })()).join('\n');
    };

    return Css;

  })();

  Chocokup.Css.Animation = (function() {
    function Animation() {}

    Animation.create = function(anims, css_class) {
      var anim, css, delay, i, prefix, result, time, what, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;

      result = '';
      if (css_class == null) {
        css_class = {};
      }
      if ((_ref = css_class.select) == null) {
        css_class.select = 'to-anim';
      }
      if ((_ref1 = css_class.trigger) == null) {
        css_class.trigger = 'animate';
      }
      css = [];
      delay = 0;
      prefix = Chocokup.Css.prefix;
      for (i = _i = 0, _len = anims.length; _i < _len; i = ++_i) {
        anim = anims[i];
        switch (anim.type) {
          case 'typing':
            time = 0.15;
            css.push("." + ((_ref2 = anim.css) != null ? _ref2 : 'typing') + ".text-" + i + "." + css_class.trigger + " span {");
            css.push(prefix("    -?-animation: typing " + (time * anim.what.length) + "s steps(" + anim.what.length + ", end), blink-caret 0.5s step-end;"));
            css.push(prefix("    -?-animation-iteration-count: 1, " + (2 * time * anim.what.length) + ";"));
            css.push(prefix("    -?-animation-delay: " + delay + "s;"));
            css.push(prefix("    -?-animation-fill-mode: forwards, none;"));
            css.push('}\n');
            delay += time * anim.what.length;
            break;
          case 'fly':
            time = 4;
            _ref3 = anim.what;
            for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
              what = _ref3[_j];
              css.push(("." + anim.type + "-") + what + ("." + css_class.trigger + " {"));
              css.push(prefix("    -?-animation: " + anim.type + "-" + what + " " + time + "s;"));
              css.push(prefix("    -?-animation-delay: " + delay + "s;"));
              css.push(prefix("    -?-animation-fill-mode: forwards;"));
              css.push("    position:relative;");
              css.push('}\n');
            }
            delay += time;
            break;
          case 'open':
            time = 3;
            _ref4 = anim.what;
            for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
              what = _ref4[_k];
              css.push(("." + anim.type + "-") + what + ("." + css_class.trigger + " {"));
              css.push(prefix("    -?-animation: " + anim.type + "-" + what + " " + time + "s;"));
              css.push(prefix("    -?-animation-delay: " + delay + "s;"));
              css.push(prefix("    -?-animation-fill-mode: forwards;"));
              css.push("    position:relative;");
              css.push('}\n');
            }
            delay += time;
            break;
          case 'appear':
            time = 2.5;
            _ref5 = anim.what;
            for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
              what = _ref5[_l];
              css.push("." + anim.type + "-" + what + "." + css_class.trigger + " {");
              css.push(prefix("    -?-animation: " + anim.type + " " + time + "s;"));
              css.push(prefix("    -?-animation-delay: " + delay + "s;"));
              css.push(prefix("    -?-animation-fill-mode: forwards;"));
              css.push('}\n');
            }
            delay += time;
        }
      }
      result += '\n<style>\n' + css.join('\n') + '\n</style>\n';
      for (i = _m = 0, _len4 = anims.length; _m < _len4; i = ++_m) {
        anim = anims[i];
        if (anim.type === 'typing') {
          result += "\n<div class='" + css_class.select + " text-" + i + " " + anim.css + "'>";
          result += "\n    " + anim.what;
          result += "\n    <span>&nbsp</span>";
          result += "\n</div>";
        }
      }
      return result;
    };

    return Animation;

  })();

  _module = typeof window !== "undefined" && window !== null ? window : module;

  _module.exports = Chocokup;

  if (typeof window !== "undefined" && window !== null) {
    _module.Chocokup = Chocokup;
  }

}).call(this);
