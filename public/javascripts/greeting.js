function bind_sign_page(t) {
    function a() {
        var e = window.localStorage.getItem("signer_name");
        return last_entry_signer_name || current_user_signer_name || e || null
    }

    function n() {
        3 === t && ($("#auto_move_alert").hide(), $("#overlap_fixed_alert").hide(), $("#overlap_fixed_forced_alert").hide())
    }

    function i() {
        if (window.getSelection) {
            var e = window.getSelection();
            if (e.getRangeAt && e.rangeCount) return e.getRangeAt(0)
        } else if (document.selection && document.selection.createRange) return document.selection.createRange();
        return null
    }

    function r(e) {
        function t(e) {
            e && (window.getSelection ? ((a = window.getSelection()).removeAllRanges(), a.addRange(e)) : document.selection && e.select && e.select())
        }
        if (t(it), document.queryCommandSupported("insertText")) document.execCommand("insertText", !1, e);
        else {
            var a, n;
            (n = (a = window.getSelection()).getRangeAt(0)).deleteContents();
            var i = document.createTextNode(e);
            n.insertNode(i), n.setStartAfter(i), a.removeAllRanges(), a.addRange(n)
        }
        var r = document.querySelector("#contenteditable_entry_text");
        if (it) {
            "contenteditable_entry_signer_name" === it.endContainer.parentElement.id && (r = document.querySelector("#contenteditable_entry_signer_name"));
            var o = r.childNodes[0];
            void 0 !== o && (it.setStart(o, it.startOffset + e.length), it.setEnd(o, it.endOffset))
        }
    }

    function o() {
        if (window.getSelection) {
            var e = window.getSelection(),
                t = e.getRangeAt(0),
                a = document.createElement("br"),
                n = document.createTextNode("\u200b");
            t.deleteContents(), t.insertNode(a), t.setStartAfter(a), t.setEndAfter(a), t.insertNode(n), t.setStartBefore(n), t.setEndBefore(n), e.removeAllRanges(), e.addRange(t)
        }
    }

    function s(e) {
        e ? $("#font_size_choices").fadeIn("fast") : $("#font_size_choices").hide()
    }

    function l() {
        let e = $("#entry_font_size_px").val();
        $(".font_size_choice .check_icon").css("visibility", "hidden"), $('.font_size_choice[data-font_size_px="' + e + '"] .check_icon').css("visibility", "visible"), W()
    }

    function c(e, t, a) {
        let n = p(a);
        const i = a.text();
        if (n < 0) {
            const e = i.length + n,
                t = i.substring(0, e);
            a.text(t), n = 0, $("#character_limit_modal").modal("show")
        }
        let r = n;
        0 === n ? r = '<span class="text-danger">0</span>' : $("#text_entry_text_is_too_long_validation").hide(), $("#" + t).html(r)
    }

    function d(e) {
        const t = $("#text_entry_options_with_dimensions")[0].getBoundingClientRect().bottom;
        e.css({
            visibility: "hidden"
        }).show();
        const a = e.outerHeight();
        e.hide().css({
            visibility: "visible"
        });
        const n = t + a > window.innerHeight;
        let i;
        i = "auto" === e.css("top") ? e.css("bottom") : e.css("top"), n ? e.css({
            top: "auto",
            bottom: i
        }) : e.css({
            top: i,
            bottom: "auto"
        })
    }

    function _() {
        l();
        let e = at[nt];
        $("#font_size_picker_container").on("click", ".font_size_choice", (function() {
            s(!1);
            let t = $(this).data("font_size_px");
            $("#entry_font_size_px").val(t), c(e, "entry_char_counter", $("#contenteditable_entry_text")), l()
        })), $(document).mouseup((function(e) {
            $("#font_size_choices").is(e.target) || 0 !== $("#font_size_choices").has(e.target).length || $("#open_font_size_picker").is(e.target) || 0 !== $("#open_font_size_picker").has(e.target).length || s(!1)
        })), $("#open_font_size_picker").mouseup((function() {
            $("#font_size_choices").is(":hidden") ? (d($("#font_size_choices")), s(!0), $(this).tooltip("hide")) : s(!1)
        })), $("#entry_font_size_px").change((function() {
            l()
        }))
    }

    function p(e) {
        let a = $("#entry_font_size_px").val();
        a = void 0 === a ? nt : parseInt(a);
        let n = at[a];
        const i = e.text();
        if (n -= i.length, 3 !== t) {
            if ("" !== $("#entry_text_eid").val()) {
                var r = $("#text_entry_modal_signer_name").val().trim();
                $("#entry_is_exclude_name").is(":checked") || i.toLowerCase().indexOf(r.toLowerCase()) > 0 && (n += r.length)
            }
        }
        return n
    }

    function h(e, t, a) {
        var n;
        return function() {
            var i = this,
                r = arguments,
                o = function() {
                    n = null, a || e.apply(i, r)
                },
                s = a && !n;
            clearTimeout(n), n = setTimeout(o, t), s && e.apply(i, r)
        }
    }

    function u(e) {
        var t = $(".cover_photo_entry[data-cover_template_editable_photo_area_id=" + e + "]");
        if (t.length > 0) {
            $(".cover_template_editable_photo_area_content").removeClass("edit_cover_entry_clickable"), $(".cover_template_editable_text_area_content").removeClass("edit_cover_entry_clickable");
            var a = t.find(".photo_image").attr("src"),
                n = parseInt(t.find(".cover_photo_entry_inner").css("left").replace("px", ""), 10),
                i = parseInt(t.find(".cover_photo_entry_inner").css("top").replace("px", ""), 10);
            g(e, {
                saved_image: {
                    url: a,
                    width: t.find(".cover_photo_entry_inner").width(),
                    height: t.find(".cover_photo_entry_inner").height(),
                    offset_x: n,
                    offset_y: i,
                    id: t.data("id"),
                    angle: t.data("angle"),
                    is_flip_x: t.data("is_flip_x"),
                    is_flip_y: t.data("is_flip_y")
                }
            }), t.hide()
        } else $("#cover_template_entry_photo_upload").data("cover_template_editable_photo_area_id", e).click()
    }

    function f(e) {
        $(".cover_template_editable_text_area_content").removeClass("edit_cover_entry_clickable"), $(".cover_template_editable_photo_area_content").removeClass("edit_cover_entry_clickable");
        var t = $(".cover_text_entry[data-cover_template_editable_text_area_id=" + e + "]");
        t.length > 0 ? (y(e, {
            text_content: t.html(),
            font_size: t.css("font-size")
        }), t.hide()) : y(e, {
            text_content: "",
            font_size: "16px"
        })
    }

    function v(e, t, a, n) {
        n.data("angle", 0), n.data("is_flip_x", !1), n.data("is_flip_y", !1);
        var i, r, o = a.width(),
            s = a.height();
        o > s ? r = t * (i = o) / e : i = e * (r = s) / t, n.width(i), n.height(r), n.css("top", 0), n.css("left", 0), m(n)
    }

    function m(e) {
        var t = e.data("is_flip_x"),
            a = e.data("is_flip_y"),
            n = "rotateZ(" + e.data("angle") + "deg) ";
        t && (n += "scaleX(-1)"), a && (n += "scaleY(-1)"), e.find(".cover_template_entry_preview_inner").css("transform", n)
    }

    function g(e, t) {
        t = t || {};
        var a = $(".cover_template_editable_photo_area[data-id=" + e + "]");
        a.find(".cover_entry_blank").hide(), a.find(".cancel_this_entry_trash_can").show(), a.find(".save_this_entry").show(), a.find(".edit_cover_entry_toolbar").show();
        var n = $('<div class="cover_template_entry_preview_container"      data-angle="0"      data-is_flip_x="false"      data-is_flip_y="false"      style="position:absolute; cursor:move; width:100%; height:100%;">  <div class="cover_template_entry_preview_inner" style="position:absolute; width:100%; height:100%;">    <img class="photo_image"          style="width:100%; height:100%; user-select:none;"          draggable="false"         ondragstart="return false">  </div></div>');
        a.find(".cover_template_editable_photo_area_content").append(n);
        var i = n.find(".photo_image"),
            r = t.unsaved_photo_selected,
            o = t.saved_image;
        if (r) {
            var s = window.URL.createObjectURL(r);
            i.attr("src", s), i.data("file", r), $("<img/>").attr("src", s).on("load", (function() {
                v(this.width, this.height, a, n)
            }))
        } else if (o.url) {
            var l = o.offset_x,
                c = o.offset_y;
            i.attr("src", o.url), n.css("left", l + "px").css("top", c + "px"), n.data("id", o.id), n.data("angle", o.angle), n.data("is_flip_x", o.is_flip_x), n.data("is_flip_y", o.is_flip_y), m(n), n.width(o.width), n.height(o.height)
        }
        ue(), n.draggable({
            appendTo: "body",
            opacity: 1,
            scroll: !0,
            start: function(e) {
                JqueryDraggableZoomHack.dragStartWithScalingSupport(e), a.find(".cancel_this_entry_trash_can, .save_this_entry").hide()
            },
            stop: function() {
                a.find(".cancel_this_entry_trash_can, .save_this_entry").show()
            },
            drag: function(e, t) {
                var a = {
                    boundary: {
                        x1: -1e3,
                        y1: -1e3,
                        x2: 1e3,
                        y2: 1e3
                    }
                };
                JqueryDraggableZoomHack.dragWithScalingSupport(e, t, a), n.css("left", t.position.left), n.css("top", t.position.top)
            }
        })
    }

    function y(e, t) {
        t = t || {};
        var a = $(".cover_template_editable_text_area[data-id=" + e + "]");
        a.find(".cover_entry_blank").hide(), a.find(".cancel_this_entry_trash_can").show(), a.find(".save_this_entry").show(), a.find(".edit_cover_entry_toolbar").show();
        var n = "";
        "font_family" in t && (n = "font-family:" + t.font_family + "; ");
        var i = a.height(),
            r = (a.width(), $('<div class="cover_template_entry_preview_container"      style="position:absolute; width:100%; height:100%;">  <div class="cover_template_entry_preview_inner" style="position:absolute; width:100%; height:100%;">    <span class="contenteditable_cover_entry_text entry_css_rendered"           contenteditable="true"           spellcheck="false"           style="border-style:none;             ' + n + "            font-size:" + t.font_size + ';             position:relative;             text-align:center;             width: 100%;            height: 100%;            outline:none;             display:inline-block;             cursor:text; ">' + t.text_content + "</span>  </div></div>"));
        a.find(".cover_template_editable_text_area_content").append(r);
        var s = r.find(".contenteditable_cover_entry_text");
        le(s[0]), s.bind("keydown", (function(e) {
            if (BrowserHelper.isIE() && 13 === e.which && window.getSelection) return o(), !1
        })), s.bind("input propertychange", h((function() {
            s.height("auto");
            var e = $(this)[0].scrollHeight,
                t = 4,
                a = 10;
            if (e > i)
                do {
                    var n = parseInt(s.css("font-size").replace("px", ""), 10);
                    n -= 1, s.css("font-size", n + "px"), e = $(this)[0].scrollHeight
                } while (e > i && n > a);
            else if (e < i - t)
                do {
                    n = parseInt(s.css("font-size").replace("px", ""), 10);
                    n += 1, s.css("font-size", n + "px"), e = $(this)[0].scrollHeight
                } while (e < i - t && n > a);
            s.height("100%")
        })))
    }

    function x(e) {
        var t = new FormData,
            a = e.data("id");
        t.append("cover_template_editable_photo_area_id", a);
        var n = "/cards/" + ref_canvas_key + "/cover_entries/photo/update",
            i = e.find(".photo_image").data("file");
        i && t.append("file", i);
        var r = e.find(".cover_template_entry_preview_container").css("left").replace("px", "");
        t.append("offset_x", r);
        var o = e.find(".cover_template_entry_preview_container").css("top").replace("px", "");
        t.append("offset_y", o);
        var s = e.find(".cover_template_entry_preview_container").width();
        t.append("width", s);
        var l = e.find(".cover_template_entry_preview_container").height();
        t.append("height", l);
        var c = e.find(".cover_template_entry_preview_container").data("angle");
        t.append("angle", c);
        var d = e.find(".cover_template_entry_preview_container").data("is_flip_x");
        t.append("is_flip_x", d);
        var _ = e.find(".cover_template_entry_preview_container").data("is_flip_y");
        t.append("is_flip_y", _), $.blockUI(blockUILoadingConfig), $.ajax({
            method: "POST",
            url: n,
            data: t,
            processData: !1,
            contentType: !1,
            success: function(t) {
                $.unblockUI(), C(e), $(".cover_photo_entry[data-cover_template_editable_photo_area_id=" + a + "]").remove();
                var n = EntryRendererHelper.getCoverPhotoEntryHtml(t.data.canvas_cover_entry);
                $(".cover_photo_entries").append(n)
            }
        }).done((function() {}))
    }

    function b(e) {
        var t = new FormData,
            a = e.data("id");
        t.append("cover_template_editable_text_area_id", a);
        var n = "/cards/" + ref_canvas_key + "/cover_entries/text/update",
            i = e.find(".contenteditable_cover_entry_text").html().trim();
        t.append("text_content", i);
        var r = e.find(".contenteditable_cover_entry_text").css("font-size"),
            o = parseInt(r.replace("px", ""), 10);
        t.append("font_size_px", o), $.blockUI(blockUILoadingConfig), $.ajax({
            method: "POST",
            url: n,
            data: t,
            processData: !1,
            contentType: !1,
            success: function(t) {
                $.unblockUI(), C(e), $(".cover_text_entry[data-cover_template_editable_text_area_id=" + a + "]").remove();
                var n = EntryRendererHelper.getCoverTextEntryHtml(t.data.canvas_cover_entry);
                $(".cover_text_entries").append(n)
            }
        }).done((function() {}))
    }

    function w(e) {
        var t = e.data("id"),
            a = $(".cover_photo_entry[data-cover_template_editable_photo_area_id=" + t + "]");
        if (a.length > 0) {
            $.blockUI(blockUILoadingConfig);
            var n = {
                    cover_photo_entry_id: a.data("id")
                },
                i = "/cards/" + ref_canvas_key + "/cover_entries/photo/delete";
            $.ajax({
                method: "POST",
                url: i,
                data: n,
                success: function() {
                    $.unblockUI(), a.remove()
                }
            }).done((function() {}))
        }
        C(e), e.find(".cover_entry_blank").show()
    }

    function k(e) {
        var t = e.data("id"),
            a = $(".cover_text_entry[data-cover_template_editable_text_area_id=" + t + "]");
        if (a.length > 0) {
            var n = a.data("id");
            if (a.remove(), $(".cover_template_editable_text_area_content").addClass("edit_cover_entry_clickable"), n) {
                $.blockUI(blockUILoadingConfig);
                var i = {
                        cover_photo_entry_id: n
                    },
                    r = "/cards/" + ref_canvas_key + "/cover_entries/text/delete";
                $.ajax({
                    method: "POST",
                    url: r,
                    data: i,
                    success: function() {
                        $.unblockUI()
                    }
                }).done((function() {}))
            }
        } else $(".cover_template_editable_text_area_content").addClass("edit_cover_entry_clickable");
        C(e), e.find(".cover_entry_blank").show()
    }

    function C(e) {
        $(".cover_template_editable_photo_area_content").addClass("edit_cover_entry_clickable"), $(".cover_template_editable_text_area_content").addClass("edit_cover_entry_clickable"), e.find(".cover_template_entry_preview_container").remove(), e.find(".cancel_this_entry_trash_can").hide(), e.find(".save_this_entry").hide(), e.find(".edit_cover_entry_toolbar").hide(), fe()
    }

    function D(e, t) {
        var a = e.find(".cover_template_entry_preview_container"),
            n = .1,
            i = 1,
            r = 1 - n;
        t && (i = -1, r = 1 + n);
        var o = a.width(),
            s = a.height(),
            l = Math.round(o * r),
            c = Math.round(s * r);
        a.width(l), a.height(c);
        var d = parseInt(a.css("left").replace("px", ""), 10),
            _ = parseInt(a.css("top").replace("px", ""), 10),
            p = Math.abs((l - o) / 2),
            h = Math.abs((c - s) / 2),
            u = Math.round(d + i * p),
            f = Math.round(_ + i * h);
        a.css("left", u), a.css("top", f)
    }

    function M(e, t) {
        var a = 15,
            n = -1;
        t && (n = 1);
        var i = e.find(".cover_template_entry_preview_container").data("angle");
        i += a * n, e.find(".cover_template_entry_preview_container").data("angle", i), e.find(".cover_template_entry_preview_inner").css("transform", "rotateZ(" + i + "deg)")
    }

    function T() {
        if ($("#photo_image_validation_message").hide(), $("#photo_entry_modal_signer_name_validation").hide(), "" === $("#photo_entry_modal_signer_name").val().trim()) return $("#photo_entry_modal_signer_name_validation").fadeIn("fast"), I(), !1;
        return "" !== $("#photo_upload_file").val() || ($("#photo_image_validation_message").fadeIn("fast"), I(), !1)
    }

    function I() {
        ($("#photo_entry_form_modal").data("bs.modal") || {})._isShown || ("" === $("#photo_entry_modal_signer_name").val() ? $("#submit_photo_entry_modal").show() : $("#submit_photo_entry_modal").hide(), $("#photo_entry_form_modal").modal("show"))
    }

    function z(e) {
        $(".entry_interactable_cursor").removeClass("entry_interactable_cursor"), ISSIGNING = !0, $(".card_left_side_options").hide(), $("#new_and_edit_entry_modification_area").show(), $(".sign_this_card_button_container").hide(), $(".sign_this_card_button_mobile_container").removeClass("d-sm-block").hide(), $("#entry_edit_move_preview_container").draggable({
            containment: "#new_and_edit_entry_modification_area",
            opacity: .35,
            scroll: !0,
            refreshPositions: !0,
            handle: ".entry_draggable_handle",
            start: function(e) {
                JqueryDraggableZoomHack.dragStartWithScalingSupport(e), n()
            },
            drag: function(e, t) {
                var a = {
                    transform_scale: st,
                    boundary: {
                        x1: 0,
                        y1: 0,
                        x2: default_width,
                        y2: default_height
                    }
                };
                JqueryDraggableZoomHack.dragWithScalingSupport(e, t, a)
            }
        }), $("#entry_edit_move_preview_container").resizable({
            maxWidth: default_width,
            minWidth: et,
            minHeight: tt,
            handles: "e, w",
            containment: "#new_and_edit_entry_modification_area",
            stop: function() {
                3 === t && $(this).height("auto")
            }
        }), $("#entry_edit_move_preview_container").bind("resize", (function() {
            ne(this)
        }));
        var a = $("#" + e).css("left").replace("px", "");
        a = parseInt(a, 10), $("#entry_edit_move_preview_container").css("left", a);
        var i = $("#" + e).css("top").replace("px", "");
        i = parseInt(i, 10), $("#entry_edit_move_preview_container").css("top", i), $("#entry_edit_move_preview_container").width($("#" + e).width());
        var r = $("#" + e).clone();
        ot = parseInt($("#" + e).attr("id").replace("entry_", ""), 10), $("#entry_edit_move_content").html(r.html()), $("#" + e).hide(), $("#entry_edit_move_preview_container").fadeIn("fast"), Ce(), ne($("#entry_edit_move_preview_container"))
    }

    function S() {
        ISSIGNING = !1, $(".card_left_side_options").show(), $(".sign_this_card_button_container").show(), $(".sign_this_card_button_mobile_container").addClass("d-sm-block").show(), null !== ot && ($("#entry_" + ot).show(), ot = null), $("#photo_preview_container").hide(), $("#photo_entry_menu").hide(), $("#entry_edit_move_preview_container").hide(), $("#entry_edit_move_content").html(""), $("#new_and_edit_entry_modification_area").hide()
    }

    function P() {
        if (3 === t && (fe(), $.blockUI(blockUILoadingConfig), null !== ot && $("#entry_edit_move_preview_container").is(":visible"))) {
            var e = $("#entry_edit_move_preview_container").width(),
                a = $("#entry_edit_move_preview_container").height(),
                n = $("#entry_edit_move_preview_container").css("left").replace("px", "");
            n = parseInt(n, 10);
            var i = $("#entry_edit_move_preview_container").css("top").replace("px", "");
            i = parseInt(i, 10);
            var r = $("#current_page_number").text().trim();
            r = parseInt(r, 10);
            var o = {
                width: e,
                height: a,
                pos_x: n,
                pos_y: i,
                page: r
            };
            $.ajax({
                method: "POST",
                url: "/entries/" + ot + "/move",
                data: o,
                success: function() {
                    $("#entry_" + ot).css({
                        left: n + "px",
                        top: i + "px",
                        width: e + "px",
                        height: a + "px"
                    }), $("#entry_" + ot).appendTo("#canvas_page_" + r), S(), Ge((function() {
                        $.unblockUI()
                    }))
                }
            }).done((function() {}))
        }
    }

    function U(e) {
        e ? ($("#toggle_visible_name").find(".toggle_visible_name_icon").removeClass("fa-eye-slash").addClass("fa-eye"), $("#toggle_visible_name").find(".toggle_visible_name_icon").attr("data-original-title", "Show name in message"), 3 === t && $("#contenteditable_entry_signer_name").css("opacity", ".25")) : ($("#toggle_visible_name").find(".toggle_visible_name_icon").removeClass("fa-eye").addClass("fa-eye-slash"), $("#toggle_visible_name").find(".toggle_visible_name_icon").attr("data-original-title", "Hide name from message"), 3 === t && $("#contenteditable_entry_signer_name").css("opacity", "1"))
    }

    function j(e) {
        var a, n = document.getElementsByClassName("text-alignment-preview");
        for (a = 0; a < n.length; a += 1) n[a].dataset.textAlignment === e ? ($(".text-alignment-preview").eq(a).addClass("border-info"), $(".text-alignment-preview").eq(a).removeClass("border-white"), 3 === t && $("#open_alignment_wrapper").find("i").removeClass("fa-align-left").removeClass("fa-align-center").removeClass("fa-align-right").addClass("fa-align-" + e)) : ($(".text-alignment-preview").eq(a).addClass("border-white"), $(".text-alignment-preview").eq(a).removeClass("border-info"))
    }

    function A(e) {
        $("#entry_text_alignment").val(e), W()
    }

    function E(e, t, a) {
        var n = t;
        return "" !== t && (n += "\n"), t.toLowerCase().indexOf(e.toLowerCase()) < 0 && !a && (n += e), n
    }

    function O() {
        var e = parseInt($("#entry_posY").val()),
            t = $("#text_preview_container").height() + e;
        if (t > default_height) {
            var a = e - (t - default_height) - 5;
            $("#text_preview_container").css("top", a)
        }
    }

    function F(e) {
        if (3 === t) {
            const t = $("#signer_create_account_button");
            if (dt[e] && t.length > 0) {
                switch (e) {
                    case "signing":
                        _t = setTimeout((function() {
                            t.popover("show")
                        }), 5e3);
                        break;
                    case "hover":
                        t.popover("show")
                }
                dt[e] = !1
            }
        }
    }

    function W() {
        var e = $("#finalize_entry_text_form"),
            a = e.find("#entry_is_exclude_name").is(":checked"),
            n = "",
            i = "";
        3 === t ? n = E(i = $("#text_preview_container #contenteditable_entry_signer_name").val().trim(), n = $("#text_preview_container #contenteditable_entry_text").html().trim(), a) : 2 === t ? (i = e.find("#text_entry_modal_signer_name").val().trim(), n = e.find("#contenteditable_entry_text").html().trim(), n = E(i = (i = (i = i.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;"), n, a)) : (i = e.find("#text_entry_modal_signer_name").val().trim(), n = e.find("#entry_text").val().trim());
        let r = e.find("#entry_width").val();
        r = H(r, e.find("#entry_text_eid").val(), n);
        var o = e.find("#entry_angle").val();
        o = Math.round(o);
        var s = e.find("#entry_font_color").val(),
            l = e.find("#entry_font").val();
        let c = e.find("#entry_font_size_px").val();
        var d = e.find("#entry_text_alignment").val();
        if (3 === t) {
            var _ = {
                width: r,
                color: s,
                "font-family": p = "gg-" + l,
                "text-align": d,
                "font-size": c + "px",
                transform: "rotate(" + o + "deg)"
            };
            $("#contenteditable_entry_area").css(_), $("#text_preview_container").height("auto")
        } else if (2 === t) {
            $("#cover_white_virtual_background").remove(), $("#modal_text_preview").html(n);
            var p;
            _ = {
                width: r,
                color: s,
                "font-family": p = "gg-" + l,
                "text-align": d,
                transform: "rotate(" + o + "deg)"
            };
            $("#contenteditable_entry_text").css(_), $("#contenteditable_entry_signer_name").css({
                "font-family": p
            }), $("#text_preview").css(_), $("#text_preview").html(n)
        } else {
            var h = [];
            h.push("content=" + encodeURIComponent(n)), h.push("signer_name=" + encodeURIComponent(i)), h.push("width=" + encodeURIComponent(r)), h.push("angle=" + encodeURIComponent(o)), h.push("font_color=" + encodeURIComponent(s)), h.push("font=" + encodeURIComponent(l)), "" != d && h.push("text_alignment=" + d), a && h.push("is_exclude_name=" + a);
            var u = "/entries/text?" + h.join("&");
            $("#modal_text_preview").attr("src", u), $("#text_preview").attr("src", u), $("#text_preview").width("auto"), $("#cover_white_virtual_background").remove(), O()
        }
        $("#preview_watermark").hide()
    }

    function H(e, a, n) {
        let i = 400;
        if ((e = Math.round(e)) <= 0 && "" === a) {
            e = Qe;
            let a = 150;
            if (n.length > a && (e = i, 3 === t)) {
                let t = $("#text_preview_container").css("left").replace("px", "");
                t = parseInt(t, 10);
                let a = t + e - $(".canvas_page").width();
                a > 0 && (e -= a)
            }
        }
        return e
    }

    function N() {
        var e = $("#entry_text_eid").val();
        return "" === e && (e = $("#entry_photo_eid").val()), "" === e && (e = $("#entry_icon_eid").val()), "" === e && (e = $("#entry_giphy_eid").val()), "" !== e ? parseInt(e, 10) : null
    }

    function R(e) {
        return 2 === t || 3 === t ? EntryRendererHelper.getEntryHtml(t, e) : '<img class="entry" id="entry_' + e.eid + '" src="' + e.url + '" draggable="false" ondragstart="return false" style="position: absolute;  left: ' + e.x + "px;  top: " + e.y + 'px;" width="' + e.width + '">'
    }

    function V() {
        var a = !0;
        if ($("#signer_email").is(":visible") && (He() || (a = !1)), 3 === t && $("#text_preview_container").is(":visible")) {
            if ("" === $("#contenteditable_entry_signer_name").text().trim() && ($("#text_entry_signer_name_validation").fadeIn("fast"), a = !1), p($("#contenteditable_entry_text")) < 0) return $("#text_entry_text_is_too_long_validation").fadeIn("fast"), e.preventDefault(), !1
        }
        return a
    }

    function Y() {
        var e, t = ["text_preview_container", "photo_preview_container", "icon_preview_container", "giphy_preview_container", "entry_edit_move_preview_container"];
        for (e = 0; e < t.length; e += 1)
            if ($("#" + t[e]).is(":visible")) return !0;
        return !1
    }

    function q(e, t, a, n) {
        if ($("#canvas_page_" + e).hasClass("locked_page")) {
            var i = qe();
            ze(i.recommended_page, 1e3), Ue()[0].css({
                left: i.x_coordinate,
                top: i.y_coordinate
            })
        } else {
            var r = Pe($(t));
            a = r.x2 - r.x1, n = r.y2 - r.y1;
            var o = Ve(parseInt($("#entry_page_number").val(), 10), a, n);
            o && $(t).css({
                left: o[0],
                top: o[1]
            })
        }
    }

    function L(e) {
        ISSIGNING = !0, $("#signer_email").val(current_user_signer_email), $("#card_preview").css("visibility", "visible");
        var a = parseInt($(".entry_page_number").val(), 10),
            n = $("#canvas_preview_container .canvas_page").length - 1;
        if (3 === t) {
            var i = 260,
                r = 150;
            if (0 === a || a === n) {
                var o = n - 1 - 1;
                if (0 === o) $(e).css({
                    left: 0,
                    top: 0
                }), ze(1, 1e3);
                else {
                    ze(o, 1e3);
                    var s = qe();
                    ze(s.recommended_page, 1e3), $(e).css({
                        left: s.x_coordinate,
                        top: s.y_coordinate
                    })
                }
            } else q(a, e, i, r)
        } else a !== n - 1 && ze(recommended_page_to_sign, 1e3);
        Ce()
    }

    function G(e) {
        let t = "/sign/" + ref_canvas_key + "/?page=" + e;
        ISSIGNING = !1, null === N() && (t += "&share_card=true"), window.location = t
    }

    function B() {
        let e = $("#photo_entry_modal_signer_name").val().trim();
        current_user_signer_name || window.localStorage.setItem("signer_name", e);
        let t = new FormData($("#finalize_entry_photo_form")[0]);
        const a = $("#photo_preview_container");
        let n = a.css("left").replace("px", "");
        n = parseInt(n, 10), t.append("photo[pos_x]", n);
        let i = a.css("top").replace("px", "");
        i = parseInt(i, 10), t.append("photo[pos_y]", i);
        const r = a.data("is_flip_x");
        t.append("photo[is_flip_x]", r);
        const o = a.data("is_flip_y");
        t.append("photo[is_flip_y]", o);
        const s = a.data("angle");
        t.append("photo[angle]", s), t.append("photo[signer_name]", e);
        let l = $("#photo_preview").width();
        t.append("photo[width]", l);
        let c = $("#photo_preview").height();
        t.append("photo[height]", c), t.append("signer_email", current_user_signer_email);
        let d = $("#photo_upload_file")[0].files[0];
        return t.append("photo[userfile]", d), t
    }

    function Z() {
        $("#entry_width").val($("#text_preview_container").width());
        let e = $("#text_preview_container").height();
        3 === t && (e = $("#text_preview_container #contenteditable_entry_area").height()), $("#entry_height").val(e);
        let a = $("#text_preview_container").css("left").replace("px", "");
        a = parseInt(a, 10), $("#entry_posX").val(a);
        let n = $("#text_preview_container").css("top").replace("px", "");
        n = parseInt(n, 10), $("#entry_posY").val(n), 3 === t ? $("#entry_text").val($("#contenteditable_entry_text").html()) : 2 === t && $("#entry_text").val($("#text_preview").html());
        let i = new FormData($("#finalize_entry_text_form")[0]),
            r = "";
        return r = 3 === t ? $("#contenteditable_entry_signer_name").html().trim() : $("#text_entry_modal_signer_name").val().trim(), i.append("text[signer_name]", r), current_user_signer_name || window.localStorage.setItem("signer_name", r), i.append("signer_email", current_user_signer_email), i
    }

    function X() {
        $("#entry_giphy_width").val($("#giphy_preview_container").width()), $("#entry_giphy_height").val($("#giphy_preview_container").height());
        let e = $("#giphy_preview_container").css("left").replace("px", "");
        e = parseInt(e, 10), $("#entry_giphy_posX").val(e);
        let t = $("#giphy_preview_container").css("top").replace("px", "");
        t = parseInt(t, 10), $("#entry_giphy_posY").val(t);
        let a = new FormData($("#finalize_entry_giphy_form")[0]),
            n = $("#giphy_entry_modal_signer_name").val().trim();
        return a.append("giphy[signer_name]", n), current_user_signer_name || window.localStorage.setItem("signer_name", n), a.append("signer_email", current_user_signer_email), a
    }

    function J() {
        if (V()) {
            let e, t, a = new FormData;
            if ($("#text_preview_container").is(":visible")) {
                t = Z();
                for (let e of t.entries()) a.append(e[0], e[1]);
                e = $("#finalize_entry_text_form").find(".entry_page_number").val()
            }
            if ($("#photo_preview_container").is(":visible")) {
                t = B();
                for (let e of t.entries()) a.append(e[0], e[1]);
                e = $("#finalize_entry_photo_form").find(".entry_page_number").val()
            }
            if ($("#giphy_preview_container").is(":visible")) {
                t = X();
                for (let e of t.entries()) a.append(e[0], e[1]);
                e = $("#finalize_entry_giphy_form").find(".entry_page_number").val()
            }
            Array.from(a.keys()).length && ($.blockUI(blockUILoadingConfig), $.ajax({
                method: "POST",
                url: "/entries/add_entry",
                contentType: !1,
                processData: !1,
                data: a,
                success: function() {
                    if ($("#photo_preview_container").is(":visible")) {
                        if (t.get("photo[eid]")) return K(t), void Q()
                    }
                    G(e)
                }
            }).done((function() {})))
        }
    }

    function K(e) {
        const t = e.get("photo[eid]"),
            a = $("#entry_" + t),
            n = e.get("photo[page]"),
            i = e.get("photo[pos_x]"),
            r = e.get("photo[pos_y]"),
            o = e.get("photo[width]"),
            s = e.get("photo[height]"),
            l = e.get("photo[angle]");
        a.data("angle", l), a.css({
            left: i + "px",
            top: r + "px",
            width: o + "px",
            height: s + "px",
            transform: `rotate(${l}deg)`
        });
        const c = e.get("photo[is_flip_x]");
        a.data("is_flip_x", c);
        const d = e.get("photo[is_flip_y]");
        a.data("is_flip_y", d), a.appendTo("#canvas_page_" + n);
        const _ = `scale(${"yes"===c?-1:1}, ${"yes"===d?-1:1})`;
        a.find("img").css("transform", _), S(), Ge((function() {
            $.unblockUI()
        }))
    }

    function Q() {
        $("#finalize_entry_photo_form").find("#entry_photo_eid").val(""), ct && (ct.destroy(), ct = null)
    }

    function ee() {
        return $("#text_preview_container, #icon_preview_container, #photo_preview_container, #giphy_preview_container").is(":visible")
    }

    function te() {
        $("#new_and_edit_entry_modification_area").show(), ee() ? ($(".entry_interactable_cursor").removeClass("entry_interactable_cursor"), $("#submit_entries_container").is(":visible") || $("#submit_entries_container").fadeIn("fast"), $("#cancel_entry_button_mobile").is(":visible") || $("#cancel_entry_button_mobile").fadeIn("fast"), $("#submit_all_entries_button_mobile").is(":visible") || $("#submit_all_entries_button_mobile").fadeIn("fast"), $("#info_container").hide(), $("#detail_edit_entry").attr("disabled", "disabled").hide()) : ($(".entry_edit_clickable, .entry_move_clickable").addClass("entry_interactable_cursor"), $("#submit_entries_container").hide(), $("#cancel_entry_button_mobile").hide(), $("#submit_all_entries_button_mobile").hide(), $("#info_container").show(), $("#detail_edit_entry").removeAttr("disabled").show(), Be()), Ce()
    }

    function ae() {
        var e = 576,
            t = "auto",
            a = "auto";
        $("#viewable_canvas").height("auto");
        var n = $("#viewable_canvas").height() / e;
        $(window).width() < e && (st = $(window).width() / e, a = $(window).width(), t = $(window).width() * n), $(".sign_version_3 #viewable_canvas").css("transform", "scale(" + st + ")").css("-webkit-transform", "scale(" + st + ")").height(t), $("#main_canvas_area").outerWidth(a)
    }

    function ne(e) {
        if (3 === t) {
            const t = 130;
            var a = $(e).find(".entry_preview").width();
            const n = $(e).find(".resizable_save_button");
            a > t ? (n.removeClass("btn-icon-only rounded-circle"), n.addClass("btn-icon rounded-pill"), n.find(".btn-inner--text").show()) : (n.removeClass("btn-icon rounded-pill"), n.addClass("btn-icon-only rounded-circle"), n.find(".btn-inner--text").hide())
        }
    }

    function ie() {
        let e = "Are you sure you want to delete this? There is no undo. ";
        $(".canvas_page.active .entry").length > 0 && (e += "This page has entries, and deleting it cannot be undone.");
        const t = $(".delete_page_modal");
        t.find(".modal-body").html(`${e}<br>`), t.modal("show")
    }

    function re() {
        $("#icons .icon").removeClass("border-info"), $("#icons .icon").addClass("border-white"), $("#icon_preview_container").hide(), $("#cancel_icon_clickable").hide(), $("#entry_icon_posX").val("-1"), $("#entry_icon_posY").val("-1"), $("#entry_icon_width").val("-1"), $("#entry_icon_id").val(""), te()
    }

    function oe() {
        $("#giphy_images .giphy_image").removeClass("border-info"), $("#giphy_images .giphy_image").addClass("border-white"), $("#giphy_preview_container").hide(), $("#cancel_entry_button_mobile").hide(), $("#entry_giphy_posX").val("-1"), $("#entry_giphy_posy").val("-1"), $("#entry_giphy_width").val("-1"), $("#entry_giphy_height").val("-1"), $("#entry_giphy_url").val(""), te()
    }

    function se() {
        const e = $("#entry_font > option").map((function() {
            return this.value
        })).get();
        if (last_text_entry_font_name && e.includes(last_text_entry_font_name)) $("#entry_font").val(last_text_entry_font_name);
        else if (e.length > 0) {
            const t = e[Math.floor(e.length * (Math.random() % 1))];
            $("#entry_font").val(t)
        }
    }

    function le(e) {
        var t, a;
        window.getSelection && document.createRange ? ((a = document.createRange()).selectNodeContents(e), (t = window.getSelection()).removeAllRanges(), t.addRange(a)) : document.body.createTextRange && ((a = document.body.createTextRange()).moveToElementText(e), a.select()), $(e).focus()
    }

    function ce() {
        if ($("#text_entry_text_is_empty_validation").hide(), 3 === t) {
            $("#text_preview_container").fadeIn("fast"), $("#entry_customize").fadeIn("fast"), le($("#contenteditable_entry_text")[0]);
            var e = a();
            $("#contenteditable_entry_signer_name").html(e), te(), ue()
        } else {
            $("#text_entry_form_modal").modal("show"), (e = a()) ? $("#text_entry_modal_signer_name").val(e) : $("#preview_watermark").show(), Ze()
        }
        $("#entry_char_counter").html("")
    }

    function de(e) {
        var a = "";
        a = 3 === t ? e.id.replace("entry_", "") : e.id.replace("edit_entry_", "");
        var n = $(e).closest(".edit_entry");
        Ge((function() {
            $.blockUI(blockUILoadingConfig), $.ajax({
                method: "GET",
                url: "/entries/" + a + "/details",
                success: function(e) {
                    $.unblockUI(), he(e, !1)
                }
            }), n.addClass("active");
            var e = n.siblings(".edit_entry");
            e.addClass("d-none"), Re(e.find("button")), n.find("button").toggleClass("btn-outline-danger"), n.find("button").toggleClass("btn-outline-info").attr("disabled", "disabled"), $(".sign-this-card-button, #detail_edit_entry").attr("disabled", "disabled"), $(".add-photo-button").hide()
        }))
    }

    function _e(e, a) {
        if ($("#finalize_entry_text_form #entry_text_eid").val(e.eid), 2 === t || 3 === t) {
            var n = e.content;
            n = EntryRendererHelper.plainText2HtmlSafe(n), $("#contenteditable_entry_text").html(n);
            var i = e.signer_name;
            $("#contenteditable_entry_signer_name").html(i)
        } else $("#entry_text").val(e.content);
        $("#text_preview_container").css({
            left: e.x + "px",
            top: e.y + "px",
            width: "auto"
        }), $("#entry_posX").val(e.x), $("#entry_posY").val(e.y), $("#entry_font_color").val(e.font_color), Xe(), $("#entry_font_size_px").val(e.font_size_px), l(), 0 === $('#entry_font > option[value="' + e.font_name + '"]').length ? se() : $("#entry_font").val(e.font_name), $("#entry_angle").val(e.angle), $("#entry_width").val(e.width), $("#entry_height").val(e.height), $("#text_entry_modal_signer_name").val(e.signer_name), $("#signer_email").val(e.signer_email), $("#prepare_entry_slider").slider("option", "value", e.angle).change(), $("#entry_is_exclude_name").prop("checked", e.is_exclude_name), U(e.is_exclude_name), e.text_alignment ? (j(e.text_alignment), $("#entry_text_alignment").val(e.text_alignment)) : ye(), W(), a && (2 === t || 3 === t ? ($("#text_preview_container").fadeIn("fast"), $("#entry_customize").fadeIn("fast")) : $("#text_preview").on("load", (function() {
            $("#text_preview_container").fadeIn("fast"), $("#entry_customize").fadeIn("fast")
        })))
    }

    function pe(e) {
        const t = $("#" + e.type + "_preview");
        t.find("img").attr("src", e.url);
        const a = $("#" + e.type + "_preview_container");
        a.fadeIn("fast"), a.css({
            left: e.x + "px",
            top: e.y + "px"
        }), a.width(e.width), a.height(e.height);
        const n = e.is_flip_x ? "yes" : "no";
        a.data("is_flip_x", n);
        const i = e.is_flip_y ? "yes" : "no";
        a.data("is_flip_y", i), a.data("angle", e.angle);
        const r = `rotate(${e.angle}deg)`;
        a.css("transform", r);
        const o = `scale(${e.is_flip_x?-1:1}, ${e.is_flip_y?-1:1})`;
        t.css("transform", o), a.fadeIn("fast"), $("#finalize_entry_photo_form #entry_photo_eid").val(e.eid), ct || (ct = EntryMoveableCreator.create())
    }

    function he(e, t) {
        ISSIGNING = !0, $("#new_and_edit_entry_modification_area").show();
        var a = e.data;
        if ("text" !== a.type || t || ce(), ze(a.page, 1e3), "text" === a.type) _e(a, t);
        else pe(a);
        $("#entry_" + a.eid).hide(), Ce()
    }

    function ue() {
        $(document).off("keyup.delete_entry").on("keyup.delete_entry", (function(e) {
            $("#delete_entry_modal.show").length > 0 || $(e.target).closest("#contenteditable_entry_area").length > 0 || 46 === e.keyCode && ($(".delete_entry_clickable:visible").trigger("click"), $("#cancel_entry_move_clickable:visible").trigger("click"), $("#cancel_photo_clickable:visible").trigger("click"), $("#cancel_photo_entry_clickable:visible").trigger("click"), $(".cancel_cover_template_entry_clickable:visible").trigger("click"), $(".cancel_giphy_clickable:visible").trigger("click"))
        }))
    }

    function fe() {
        $(document).off("keyup.delete_entry")
    }

    function ve() {
        var e = "Edit the Card";
        $(".page_slider").slider("option", "value");
        $("#ediable_entries").toggleClass("d-none"), $(".sign_this_card_button_container").toggleClass("d-none"), $(".sign_this_card_button_container").hasClass("d-none") && (e = "Done with Edits"), $("#detail_edit_entry").find("span").html(e)
    }

    function me() {
        $("#photo_preview").find("img").removeAttr("src"), $("#photo_preview_container").hide(), $("#photo_entry_menu").hide(), te(), Q()
    }

    function ge() {
        var e = $("#entry_text_eid").val();
        "" !== e && ($("#entry_" + e).fadeIn("fast"), $("#entry_text_eid").val("")), ye(), $("#entry_width").val("-1"), $("#entry_height").val("-1"), $("#entry_angle").val("0"), $("#entry_text").val(""), 2 !== t && 3 !== t || $("#contenteditable_entry_text").html(""), $("#additional_signing_instructions").hide(), $("#text_preview_container").hide(), 3 === t && $("#entry_customize").hide(), $("#modal_text_preview").removeAttr("src"), $("#preview_watermark").show(), $("#text_preview").removeAttr("src"), $(".add-photo-button").show(), $(".sign-this-card-button").removeAttr("disabled")
    }

    function ye() {
        j("left"), $("#entry_text_alignment").val("left")
    }

    function xe() {
        $("#submit_entries_container").hide(), $("#text_preview_container").hide(), 3 === t && $("#entry_customize").hide(), $("#canvas_preview_container").popover("hide"), $(".sign-this-card-button").show(), $(".sign-this-card-button").removeAttr("disabled"), $(".go-back-modal-text-entry-button").hide(), ge(), te()
    }

    function be() {
        ISSIGNING = !1, 3 === t ? ($(".card_left_side_options").show(), $(".sign_this_card_button_container").show(), $(".sign_this_card_button_mobile_container").addClass("d-sm-block").show(), $("#entry_customize").hide()) : $(".edit_entry").find("button").addClass("btn-outline-info").removeClass("btn-outline-light").removeClass("btn-outline-danger").removeAttr("disabled"), xe(), me(), re(), oe()
    }

    function we(e) {
        $(".page_slider").find(".ui-slider-handle .slider-tip .tooltip-inner").text(e)
    }

    function $e() {
        var e = parseInt($(".entry_page_number").val(), 10);
        0 !== e && e !== parseFloat($("#canvas_preview_container .canvas_page").length) - 1 || be()
    }

    function ke(e) {
        $(".edit_entry, .edit_entry_empty").addClass("d-none");
        var t = $(".edit_entry[data-page=" + e + "], .edit_entry.active");
        t.length > 0 ? t.removeClass("d-none") : $(".edit_entry_empty").removeClass("d-none")
    }

    function Ce() {
        var e = Y(),
            t = $("#canvas_preview_container .canvas_page").length - 1,
            a = 0,
            n = parseInt($("#current_page_number").text().trim(), 10);
        $("#total_pages").html(t), e && (t -= 1, a += 1), n <= a ? $(".canvas_prev").css("visibility", "hidden") : $(".canvas_prev").css("visibility", "visible"), n >= t ? $(".canvas_next").css("visibility", "hidden") : $(".canvas_next").css("visibility", "visible"), $(".page_slider").slider("option", "max", t), $(".page_slider").slider("option", "min", a), $(".page_slider").slider("option", "value", n)
    }

    function De(e) {
        if (user_can_card_admin && e > 0) {
            var t = $("#add_page_alert"),
                a = $("#add_page_fixed_alert");
            $("#canvas_preview_container .canvas_page").length - 1 !== e || lt ? (t.hide(), a.hide()) : t.show()
        }
    }

    function Me(e, a = {
        refresh: !1
    }) {
        const n = Te(e),
            i = n.find(".canvas_page_options, .page_lock_status");
        if (!0 === a.refresh && i.remove(), 0 === i.length && e > 0 && e < MAXPAGE)
            if (user_can_card_admin && 3 === t) {
                const t = `\n          <div class="btn-group dropleft canvas_page_options"\n               style="position:absolute; top:8px; right:8px; z-index: 20;">\n            <button type="button"\n                    class="btn btn-secondary btn btn-sm btn-warning rounded-circle btn-icon-only"\n                    data-toggle="dropdown"\n                    data-toggle="tooltip"\n                    data-placement="top"\n                    title="View options"\n                    aria-haspopup="true"\n                    aria-expanded="false">\n              <i class="fas fa-ellipsis-h"></i>\n            </button>\n            <div class="dropdown-menu">\n              <span class="dropdown-item-text">Options</span>\n              <a class="dropdown-item-text page_is_unlocked_button"\n                 href="#"\n                 style="${locked_pages.has(e)?"display: none;":""}">\n                <i class="fas fa-lock-open mr-1"></i>\n                  Lock this page\n              </a>\n              <a class="dropdown-item-text page_is_locked_button"\n                 href="#"\n                 style="${locked_pages.has(e)?"":"display: none;"}">\n                <i class="fas fa-lock mr-1"></i>\n                  Unlock this page\n              </a>\n              <a class="dropdown-item-text delete_page_clickable"  \n                 href="#"\n                 style="${e===MAXPAGE-1?"display: none":""}">\n                <i class="fas fa-trash-alt text-danger mr-2" id="delete_page_clickable"></i>\n                Delete this page\n              </a>\n            </div>\n          </div>    \n        `;
                n.prepend(t)
            } else if (locked_pages.has(e)) {
            const e = '\n            <div class="page_lock_status"\n                 style="position:absolute; top:8px; right:8px;">\n              <span class="btn btn-sm btn-warning rounded-circle btn-icon-only"\n                    style="z-index: 20;" disabled>\n                <i class="fas fa-lock"></i>\n                </span>\n            </div>    \n          ';
            n.prepend(e)
        }
    }

    function Te(e) {
        var t = e;
        return 0 === e ? t = "cover" : e === $("#canvas_preview_container .canvas_page").length - 1 && (t = "back"), $("#canvas_page_" + t)
    }

    function Ie(e) {
        $("#canvas_preview_container .canvas_page").removeClass("active"), $("#canvas_preview_container .canvas_page").removeClass("next_to_active"), $("#canvas_preview_container .canvas_page").removeClass("left_of_active"), $("#canvas_preview_container .canvas_page").removeClass("right_of_active"), $("#canvas_preview_container .canvas_page").removeClass("canvas_next"), $("#canvas_preview_container .canvas_page").removeClass("canvas_prev"), $(e).prev().addClass("next_to_active"), $(e).next().addClass("next_to_active"), $(e).prev().addClass("canvas_prev"), $(e).next().addClass("canvas_next"), $(e).prevAll().addClass("left_of_active"), $(e).nextAll().addClass("right_of_active"), $(e).addClass("active"), $(".next_to_active").prev().show(), $(".next_to_active").next().show()
    }

    function ze(e, a) {
        n(), ke(e), Me(e);
        var i = 0,
            r = $("#canvas_preview_container .canvas_page").length - 1;
        if (Y() && (i = 1, r -= 1), !(e < i || e > r)) {
            void 0 === a && (a = 1e3), $(".entry_page_number").val(e), $("#current_page_number").html(e);
            var o = default_width * e;
            if (3 === t && (o = 0), 3 === t) {
                var s = Te(e);

                function l() {
                    function e(e) {
                        var t = parseInt($("#current_page_number").text().trim(), 10);
                        e.detail.directions.left ? ze(t + 1, 1e3) : e.detail.directions.right && ze(t - 1, 1e3)
                    }
                    $(".canvas_page").off("swipe.swipe_to_change_page"), rt && rt.off(), rt = SwipeListener(s[0], {
                        mouse: !1,
                        minHorizontal: 100
                    }), s.on("swipe.swipe_to_change_page", e)
                }
                Ie(s), l()
            }
            $("#canvas_pages").stop().animate({
                left: -o + "px"
            }, a, "linear", (function() {})), 0 === e ? setTimeout((function() {
                0 === parseInt($(".entry_page_number").val(), 10) && ($("#cover_template_editable_photo_areas").show(), $("#cover_template_editable_text_areas").show()), $("#cover_white_virtual_background").show(), $("#canvas_page_cover").css({
                    "background-color": ""
                })
            }), 500) : ($("#cover_template_editable_photo_areas").hide(), $("#cover_template_editable_text_areas").hide(), $("#cover_white_virtual_background").hide()), $(".page_slider").slider("option", "value", e), Ce(), $e(), we(e), De(e)
        }
    }

    function Se() {
        let e = qe();
        ze(e.recommended_page, 1e3), Ue()[0].css({
            left: e.x_coordinate,
            top: e.y_coordinate
        }), ct && (ct.destroy(), ct = EntryMoveableCreator.create())
    }

    function Pe(e) {
        var a = e.css("left").replace("px", "");
        a = parseInt(a, 10);
        var n = e.css("top").replace("px", "");
        n = parseInt(n, 10);
        var i = Math.round(e.actual("width")),
            r = Math.round(e.actual("height"));
        if (3 === t) {
            var o = e.find(".entry_css_rendered_rotation_padding");
            if (o.length > 0) {
                var s = (o.innerWidth() - o.width()) / 2;
                a += s, n += s, i = Math.round(o.actual("width")), r = Math.round(o.actual("height"))
            }
        }
        return {
            x1: a,
            x2: a + i,
            y1: n,
            y2: n + r
        }
    }

    function Ue() {
        var e, a = ["text_preview_container", "giphy_preview_container", "icon_preview_container", "photo_preview_container"];
        3 === t && a.push("entry_edit_move_preview_container");
        var n = [];
        for (e = 0; e < a.length; e += 1) {
            var i = $("#" + a[e]);
            i.is(":visible") && n.push(i)
        }
        return n
    }

    function je() {
        var e, t = Ue(),
            a = [];
        for (e = 0; e < t.length; e += 1) {
            var n = t[e];
            if (n.is(":visible")) {
                var i = Pe(n);
                a.push(i)
            }
        }
        return a
    }

    function Ae() {
        var e = je();
        return !!Oe(e) || !!Fe(e)
    }

    function Ee() {
        return je().some((function(e) {
            return BoundaryDetection.isRectangleRunoff(e)
        }))
    }

    function Oe(e) {
        if (e.length < 2) return !1;
        var t;
        for (t = 0; t < e.length; t += 1) {
            var a;
            for (a = t; a < e.length; a += 1)
                if (t !== a) {
                    if (BoundaryDetection.isRectanglesOverlapping(e[t], e[a])) return !0
                }
        }
    }

    function Fe(e) {
        var t, a = !1,
            n = $("#entry_page_number").val();
        for (t = 0; t < e.length && !a; t += 1) $("#canvas_page_" + n).find(".entry").each((function() {
            var n = parseInt($(this).attr("id").replace("entry_", ""), 10),
                i = ot;
            if (null === i && (i = N()), i !== n) {
                var r = Pe($(this));
                if (BoundaryDetection.isRectanglesOverlapping(e[t], r)) return a = !0, !1
            }
        }));
        return a
    }

    function We(e) {
        $.blockUI(blockUILoadingConfig);
        var t = $("#entry_page_number").val(),
            a = {
                current_timestamp: current_timestamp,
                ref_canvas_key: ref_canvas_key,
                page: t
            };
        $.ajax({
            method: "GET",
            url: "/entries/check_for_new_entries",
            data: a
        }).done((function(t) {
            $.unblockUI(), current_timestamp = t.update_time, t.entries.length > 0 ? Ge((function() {
                let e = Ae(),
                    t = Ee();
                (e || t) && (Se(), $("#overlap_fixed_forced_alert").fadeIn("fast"), $("html").width() < 960 && $("html").animate({
                    scrollTop: $("#canvas_timer").offset().top
                }, 500))
            })) : "function" == typeof e && e()
        }))
    }

    function He() {
        var e, t = !0,
            a = $("#signer_email"),
            n = a.val().trim();
        return a.val(n), "" !== n && (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(n) || (t = !1, e = "Email address is not valid.")), !!t || ($.blockUI({
            message: e + '<br/><br/> <input class="btn btn-primary" type="button" id="dialog_continue_button" value="Continue" />',
            css: {
                padding: "15px",
                width: "275px"
            }
        }), $("#dialog_continue_button").click((function() {
            $.unblockUI()
        })), !1)
    }

    function Ne() {
        $("[name='eid']").removeAttr("value"), $("#entry_posX").remove("value"), $("#entry_posY").remove("value"), $("#entry_font_color").remove("value"), $("#entry_font").remove("value"), $("#entry_font_size_px").remove("value"), $("#entry_angle").remove("value"), $("#entry_width").remove("value"), $("#entry_height").remove("value"), $("#entry_text").val("")
    }

    function Re(e) {
        e.hasClass("btn-outline-info") ? e.attr("disabled", "disabled").removeClass("btn-outline-info").addClass("btn-outline-light") : e.hasClass("btn-outline-light") && e.removeAttr("disabled").removeClass("btn-outline-light").addClass("btn-outline-info")
    }

    function Ve(e, t, a) {
        var n = [];
        return $("#canvas_page_" + e).find(".entry").each((function() {
            if (parseInt($(this).attr("id").replace("entry_", ""), 10) !== ot) {
                var e = Pe($(this));
                n.push(e)
            }
        })), BoundaryDetection.findNextEmptySpace(t, a, n)
    }

    function Ye(e, t) {
        var a, n = [],
            i = [];
        for (a = e + 1; a <= t; a += 1) {
            $("#canvas_page_" + a).hasClass("locked_page") || n.push(a)
        }
        for (a = e - 1; a > 0; a -= 1) {
            $("#canvas_page_" + a).hasClass("locked_page") || i.push(a)
        }
        var r = [e],
            o = Math.min(n.length, i.length);
        for (a = 0; a < o; a += 1) r.push(i[a]), r.push(n[a]);
        return r = n.length > i.length ? r.concat(n.slice(a, t)) : r.concat(i.slice(a, t))
    }

    function qe() {
        var e = $("#text_preview").outerHeight(),
            a = $("#text_preview").outerWidth(),
            n = $("#canvas_preview_container .canvas_page").length - 1,
            i = [0, 0],
            r = n;
        if (3 === t) {
            var o = je()[0];
            a = o.x2 - o.x1, e = o.y2 - o.y1;
            var s = Ye(parseInt($("#entry_page_number").val(), 10), n);
            for (l = 0; l < s.length; l += 1) {
                if (!$("#canvas_page_" + s[l]).hasClass("locked_page"))
                    if (c = Ve(s[l], a, e)) {
                        r = s[l], i = c;
                        break
                    }
            }
        } else {
            var l;
            for (l = 1; l <= n; l += 1) {
                var c;
                if (c = Ve(l, a, e)) {
                    r = l, i = c;
                    break
                }
            }
        }
        return {
            recommended_page: r,
            x_coordinate: i[0],
            y_coordinate: i[1]
        }
    }

    function Le() {
        var e = $("#canvas_page_1").clone();
        return e.find(".entry").remove().end(), user_can_card_admin ? (e.find(".page_is_locked_button").hide(), e.find(".page_is_unlocked_button").show()) : (e.find("span").remove(), e.removeClass("locked_page")), e
    }

    function Ge(e) {
        var t = $("#entry_page_number").val();
        $.blockUI(blockUILoadingConfig), $.ajax({
            method: "GET",
            url: "/cards/" + ref_canvas_key + "/card_info",
            success: function(a) {
                $.unblockUI();
                var n = a.data,
                    i = n.max_page,
                    r = n.all_entries_grouped_by_page;
                $(".canvas_page").removeClass("blank_page");
                var o = i + 1;
                for (p = 1; p <= o; p += 1) {
                    var s = "canvas_page_" + p;
                    if (0 === $("#" + s).length) {
                        var l = Le();
                        $(l).attr("id", s), $("#canvas_page_back").before(l), MAXPAGE++
                    }
                }
                $(".canvas_page").eq(-2).addClass("blank_page");
                var c = ot;
                null === c && (c = N());
                var d = [];
                for (var _ in r) {
                    var p, h = r[_];
                    for (p = 0; p < h.length; p += 1) {
                        var u = h[p];
                        if (c !== u.eid) {
                            var f = R(u);
                            $("#entry_" + u.eid).remove(), $("#canvas_page_" + u.page).append(f), d.push(u.eid)
                        }
                    }
                }
                $("#canvas_preview_container .entry").each((function() {
                    var e = parseInt($(this).attr("id").replace("entry_", ""));
                    e !== c && $.inArray(e, d) < 0 && ($(this).remove(), $("#ediable_entries #entry_id_" + e).remove())
                })), ze(t, 0), "function" == typeof e && e()
            }
        })
    }

    function Be() {
        $("#ediable_entries .edit_entry").length > 0 ? $("#detail_edit_entry").show() : $("#detail_edit_entry").hide()
    }

    function Ze() {
        var e = !0;
        $("#finalize_entry_text_form input:text, #finalize_entry_text_form textarea").each((function() {
            if ("" === $(this).val()) return e = !1, this.focus(), !1
        })), e && $("#prepare_entry_text_wrapper").find("#entry_text").focus()
    }

    function Xe() {
        var e = $("#entry_font_color").val();
        $(".color_picker_choice").removeClass("selected");
        var t = $('.color_picker_choice[data-color="' + e + '"]');
        if (0 === t.length) {
            var a = Je(e);
            $(".color_picker_choices").append(a), t = $('.color_picker_choice[data-color="' + e + '"]')
        }
        t.addClass("selected"), $(".palette_icon").css("color", e), W()
    }

    function Je(e) {
        return '<span class="color_picker_choice" style="background-color:' + e + '" data-color="' + e + '"></span>'
    }

    function Ke(e) {
        var t = "/cards/" + ref_canvas_key + "/save_show_share_links",
            a = {
                is_show_share_links: e
            };
        $.ajax({
            method: "POST",
            url: t,
            data: a,
            success: function() {}
        })
    }
    var Qe = 210,
        et = 50,
        tt = 50;
    let at = {
            16: 700,
            20: 600,
            24: 500
        },
        nt = 16;
    var it, rt, ot = null,
        st = 1,
        lt = !1;
    let ct;
    const dt = {
        signing: !0,
        hover: !0
    };
    let _t;
    var pt;
    $(".hide_share_links_button").click((function() {
            Ke(!1), $("#share_card_container").fadeOut("fast"), $(".hide_share_links_button").hide(), $(".show_share_links_button").fadeIn("fast")
        })), $(".show_share_links_button").click((function() {
            Ke(!0), $("#share_card_container").fadeIn("fast"), $(".show_share_links_button").hide(), $(".hide_share_links_button").fadeIn("fast")
        })), user_can_card_admin && $("#viewable_canvas").tooltip({
            selector: ".canvas_page.active .entry",
            trigger: "hover",
            title: function() {
                return $(this).data("signer_name")
            }
        }),
        function() {
            function e(e) {
                e ? ($(".color_picker_choices").fadeIn("fast"), $(".carat_down_icon").hide(), $(".carat_up_icon").show()) : ($(".color_picker_choices").hide(), $(".carat_up_icon").hide(), $(".carat_down_icon").show())
            }

            function t() {
                var e, t = "";
                for (e = 0; e < font_colors.length; e += 1) {
                    t += Je(font_colors[e])
                }
                $(".color_picker_choices").html(t)
            }
            t(), Xe(), $(".color_picker_container").on("click", ".color_picker_choice", (function() {
                e(!1);
                var t = $(this).data("color");
                $("#entry_font_color").val(t), Xe()
            })), $(document).mouseup((function(t) {
                $(".color_picker_choices").is(t.target) || 0 !== $(".color_picker_choices").has(t.target).length || $(".color_picker").is(t.target) || 0 !== $(".color_picker").has(t.target).length || e(!1)
            })), $(".color_picker").mouseup((function() {
                $(".color_picker_choices").is(":hidden") ? (d($(".color_picker_choices")), e(!0), $(this).tooltip("hide")) : e(!1)
            })), $("#entry_font_color").change((function() {
                Xe()
            }))
        }(), _(), $(window).bind("beforeunload visibilitychange pagehide", (function() {
            if (ee() && ISSIGNING) return "You have unsaved entries to the card, are you sure you want to leave without submitting?"
        })), $("#entry_font").change((function() {
            W()
        })), $("#text_preview_container").draggable(), $("#text_preview_container").draggable("option", "containment", "#new_and_edit_entry_modification_area"), $("#text_preview_container").draggable("option", "opacity", .35), $("#text_preview_container").draggable("option", "scroll", !0), $("#text_preview_container").draggable("option", "cursor", "move"), 3 === t && ($("#text_preview_container").draggable("option", "handle", ".contenteditable_entry_text_draggable_handle"), $("#text_preview_container").draggable("option", "drag", (function(e, t) {
            var a = {
                transform_scale: st,
                boundary: {
                    x1: 0,
                    y1: 0,
                    x2: default_width,
                    y2: default_height
                }
            };
            JqueryDraggableZoomHack.dragWithScalingSupport(e, t, a)
        })), $("#text_preview_container").draggable("option", "start", (function(e) {
            JqueryDraggableZoomHack.dragStartWithScalingSupport(e), $("#text_entry_options").hide(), n()
        })), $("#text_preview_container").draggable("option", "cancel", "#emoji-button, #entry_customize")), $("#text_preview_container").bind("dragstop", (function() {
            $("#text_entry_options").show();
            var e = $(this).css("left").replace("px", "");
            e = parseInt(e, 10), $("#entry_posX").val(e);
            var t = $(this).css("top").replace("px", "");
            t = parseInt(t, 10), $("#entry_posY").val(t)
        })), 3 === t && ($(".contenteditable_entry_text_draggable_handle").on("mousedown touchstart", (function(e) {
            ("contenteditable_entry_text" === e.target.id || "contenteditable_entry_signer_name" === e.target.id || $(e.target).parents("#contenteditable_entry_text").length > 0 || $(e.target).parents("#contenteditable_entry_signer_name").length > 0) && $("#text_preview_container").draggable("option", "disabled", !0)
        })), $("body").on("mouseup touchend dragover", (function() {
            $("#text_preview_container").draggable("option", "disabled", !1)
        }))), $("#icon_preview_container").draggable(), $("#icon_preview_container").draggable("option", "containment", "#new_and_edit_entry_modification_area"), $("#icon_preview_container").draggable("option", "opacity", .35), $("#icon_preview_container").draggable("option", "scroll", !0), $("#giphy_preview_container").draggable({
            containment: "#new_and_edit_entry_modification_area",
            opacity: .35,
            scroll: !0,
            start: function(e) {
                JqueryDraggableZoomHack.dragStartWithScalingSupport(e), n()
            },
            drag: function(e, t) {
                var a = {
                    transform_scale: st,
                    boundary: {
                        x1: 0,
                        y1: 0,
                        x2: default_width,
                        y2: default_height
                    }
                };
                JqueryDraggableZoomHack.dragWithScalingSupport(e, t, a)
            }
        }), $("#prepare_entry_slider").slider(), $("#prepare_entry_slider").slider("option", "max", 6), $("#prepare_entry_slider").slider("option", "min", -6), $("#prepare_entry_slider").slider("option", "step", .1), $("#prepare_entry_slider").slider("option", "value", 0), $("#prepare_entry_slider").bind("slidechange", (function(e, t) {
            var a = t.value;
            a = Math.round(a), $("#entry_angle").val(a), W()
        })), $("#tooltip_why_email").popover({
            content: "This will allow you to edit your entry later.",
            html: !0,
            placement: "bottom",
            trigger: "hover"
        }), 3 === t && ($("#open_alignment_wrapper, .text-alignment-preview").mouseup((function() {
            var e = $("#alignment_wrapper");
            $(e).is(":visible") ? $(e).hide() : (d(e), $(e).fadeIn("fast")), $(this).tooltip("hide")
        })), $(document).mouseup((function(e) {
            $("#alignment_wrapper").is(e.target) || 0 !== $("#alignment_wrapper").has(e.target).length || $("#open_alignment_wrapper").is(e.target) || 0 !== $("#open_alignment_wrapper").has(e.target).length || $("#alignment_wrapper").hide()
        })), $("#open_entry_angle_slider").mouseup((function() {
            var e = $("#prepare_entry_slider_wrapper");
            $(e).is(":visible") ? $(e).hide() : (d(e), $(e).fadeIn("fast")), $(this).tooltip("hide")
        })), $(document).mouseup((function(e) {
            $("#open_entry_angle_slider").is(e.target) || 0 !== $("#open_entry_angle_slider").has(e.target).length || $("#prepare_entry_slider_wrapper").is(e.target) || 0 !== $("#prepare_entry_slider_wrapper").has(e.target).length || $("#prepare_entry_slider_wrapper").hide()
        }))), $(".text-alignment-preview").click((function() {
            var e = this.dataset.textAlignment;
            j(e), A(e)
        })), $("#toggle_visible_name").click((function(e) {
            e.preventDefault();
            var a = $("#finalize_entry_text_form .entry_excluded_signer_name"),
                n = a.is(":checked");
            $(this).find(".toggle_visible_name_icon").tooltip("hide"), U(!n), $(this).find(".toggle_visible_name_icon").tooltip("show"), a.prop("checked", !n), 3 !== t && W()
        })), $("#auto_move_alert").on("close.bs.alert", (function(e) {
            e.preventDefault(), $(this).hide()
        })), $("#cover_template_editable_photo_areas").on("click", ".edit_cover_entry_clickable", (function() {
            u($(this).parents(".cover_template_editable_photo_area").data("id"))
        })), $("#cover_template_editable_text_areas").on("click", ".edit_cover_entry_clickable", (function() {
            f($(this).parents(".cover_template_editable_text_area").data("id"))
        })), $("#cover_template_entry_photo_upload").change((function(e) {
            $(".cover_template_editable_photo_area_content").removeClass("edit_cover_entry_clickable"), $(".cover_template_editable_text_area_content").removeClass("edit_cover_entry_clickable"), g($(this).data("cover_template_editable_photo_area_id"), {
                unsaved_photo_selected: e.target.files[0]
            }), e.target.value = ""
        })), $(".cover_template_editable_photo_area .save_cover_template_entry_clickable").click((function() {
            x($(this).parents(".cover_template_editable_photo_area"))
        })), $(".cover_template_editable_text_area .save_cover_template_entry_clickable").click((function() {
            b($(this).parents(".cover_template_editable_text_area"))
        })), $(".cover_template_editable_photo_area .cancel_cover_template_entry_clickable").click((function() {
            w($(this).parents(".cover_template_editable_photo_area"))
        })), $(".cover_template_editable_text_area .cancel_cover_template_entry_clickable").click((function() {
            k($(this).parents(".cover_template_editable_text_area"))
        })), $(".edit_cover_entry_toolbar .cover_entry_zoom_in").click((function() {
            D($(this).parents(".cover_template_editable_photo_area"), !0)
        })), $(".edit_cover_entry_toolbar .cover_entry_zoom_out").click((function() {
            D($(this).parents(".cover_template_editable_photo_area"), !1)
        })), $(".edit_cover_entry_toolbar .cover_entry_rotate_counter_clockwise").click((function() {
            M($(this).parents(".cover_template_editable_photo_area"), !1)
        })), $(".edit_cover_entry_toolbar .cover_entry_rotate_clockwise").click((function() {
            M($(this).parents(".cover_template_editable_photo_area"), !0)
        })), $(".edit_cover_entry_toolbar .cover_entry_reset").click((function() {
            var e = $(this).parents(".cover_template_editable_photo_area"),
                t = e.find(".cover_template_entry_preview_container"),
                a = e.find(".photo_image"),
                n = a.prop("naturalHeight");
            v(a.prop("naturalWidth"), n, e, t)
        })), $(".edit_cover_entry_toolbar .cover_entry_flip_x").click((function() {
            var e = $(this).parents(".cover_template_editable_photo_area").find(".cover_template_entry_preview_container"),
                t = e.data("is_flip_x");
            t = !t, e.data("is_flip_x", t), m(e)
        })), $(".edit_cover_entry_toolbar .cover_entry_flip_y").click((function() {
            var e = $(this).parents(".cover_template_editable_photo_area").find(".cover_template_entry_preview_container"),
                t = e.data("is_flip_y");
            t = !t, e.data("is_flip_y", t), m(e)
        })), pt = "#text_preview_container", $(pt).resizable({
            maxWidth: default_width,
            minWidth: Qe,
            handles: "e, w",
            containment: "#new_and_edit_entry_modification_area"
        }), $(pt).bind("resizestop", (function() {
            $("#entry_width").val($(this).width()), $("#entry_height").val($(this).height()), W()
        })), $("#photo_entry_form_modal").on("shown.bs.modal", (function() {
            "" === $("#photo_entry_modal_signer_name").val() && $("#photo_entry_modal_signer_name").focus()
        })),
        function() {
            if (2 === t || 3 === t) $("#contenteditable_entry_text, #text_entry_modal_signer_name").bind("keyup", (function() {
                W(), F("signing")
            }));
            else {
                var e = 500;
                $("#entry_text").bind("input propertychange", h((function() {
                    $("#preview_watermark").html(""), W()
                }), e)), $("#text_entry_modal_signer_name").bind("input propertychange", h((function() {
                    W()
                }), e))
            }
        }(), $(document).ready((function() {
            function e(e) {
                $("#icons .icon").removeClass("border-info"), $("#icons .icon").addClass("border-white"), $(e).addClass("border-info"), $(e).removeClass("border-white"), $("#icon_preview").attr("src", $(e).attr("src")), $("#icon_preview_container").css("left", 300), $("#icon_preview_container").css("top", 100), $("#icon_preview_container").css("display", "block"), $("#entry_icon_posX").val($("#icon_preview_container").position().left), $("#entry_icon_posY").val($("#icon_preview_container").position().top), $("#entry_icon_width").val($("#icon_preview_container").width()), $("#entry_icon_height").val($("#icon_preview_container").height());
                var t = $(e).attr("id").replace("icon_", "");
                $("#entry_icon_id").val(t), "" === $("#entry_icon_eid").val() && $("#cancel_icon_clickable").show()
            }

            function i(e) {
                var t = $(e);
                t.addClass("d-none"), t.siblings(".move_entry_clickable, .cancel_move_entry_clickable, .delete_entry_button").toggleClass("d-none"), $("#sign-right-content").toggleClass("d-none"), $("#tabs").toggleClass("d-none");
                var a = t.closest(".edit_entry");
                a.addClass("active"), Re(a.siblings(".edit_entry").find("button")), $(".sign-this-card-button, #detail_edit_entry").attr("disabled", "disabled"), $(".add-photo-button").hide();
                var n = t.attr("id").replace("move_entry_", "");
                Ge((function() {
                    $.blockUI(blockUILoadingConfig), $.ajax({
                        method: "GET",
                        url: "/entries/" + n + "/details",
                        success: function(e) {
                            he(e, !0), $.unblockUI()
                        }
                    })
                }))
            }

            function r() {
                ISSIGNING = !1;
                var e = $(this),
                    t = e.data("type");
                $("#" + t + "_preview_container").hide(), e.toggleClass("d-none"), e.siblings(".move_entry_clickable, .move_entry_button, .delete_entry_button").toggleClass("d-none"), $(".add-photo-button").show(), $("#sign-right-content").removeClass("d-none"), $("#tabs").removeClass("d-none"), $(".sign-this-card-button, #detail_edit_entry").removeAttr("disabled"), Re($(".edit_entry:not(.active)").find("button")), xe();
                var a = e.closest(".edit_entry");
                a.removeClass("active");
                var n = a.attr("id").replace("entry_id_", "");
                $("#entry_" + n).fadeIn("fast")
            }

            function s() {
                var e = $(this).data("type"),
                    t = $(this).attr("id").replace("move_entry_clickable_", "");
                if ($(this).toggleClass("d-none"), $(this).siblings(".move_entry_clickable, .move_entry_button, .delete_entry_button, .cancel_move_entry_clickable").toggleClass("d-none"), "text" === e);
                else {
                    var a = $("#" + e + "_preview_container"),
                        n = $(a).css("left").replace("px", "");
                    n = parseInt(n, 10);
                    var i = $(a).css("top").replace("px", "");
                    i = parseInt(i, 10);
                    var r = a.width(),
                        o = a.height();
                    $("#entry_" + e + "_eid").val(t), $("#entry_" + e + "_posX").val(n), $("#entry_" + e + "_posY").val(i), $("#entry_" + e + "_width").val(r), $("#entry_" + e + "_height").val(o)
                }
                J()
            }
            if (3 === t && (ae(), $(window).resize((function() {
                    ae()
                }))), STARTPAGE > 0 && ke(STARTPAGE), $("#entry_name").bind("keypress", (function(e) {
                    if (13 === e.keyCode) return e.preventDefault(), !1
                })), $("#signer_email").bind("keypress", (function(e) {
                    if (13 === e.keyCode) return e.preventDefault(), !1
                })), BrowserHelper.isIE() && $("#contenteditable_entry_text").bind("keydown", (function(e) {
                    if (13 === e.which && window.getSelection) return o(), !1
                })), function() {
                    if (3 === t) {
                        var e = {
                            templateResult: function(e) {
                                return e.id ? '<span style="font-family: gg-' + e.element.value + '">' + e.element.value + "</span>" : e.text
                            },
                            templateSelection: function() {
                                return $("#entry_font").next(".select2-container").hide(), ""
                            },
                            dropdownAutoWidth: !0,
                            minimumResultsForSearch: 1 / 0,
                            escapeMarkup: function(e) {
                                return e
                            },
                            dropdownCssClass: "border-left border-bottom border-right toolbar-dropdown-shadow"
                        };
                        $("#entry_font").select2(e);
                        var a = !1;
                        $("#entry_font").on("select2:open", (function() {
                            a = !0, $("#fonts_select_activator").tooltip("hide"), $("#entry_font").next(".select2-container").show()
                        })), $("#entry_font").on("select2:close", (function() {
                            $("#fonts_select_activator").tooltip("hide"), $("#entry_font").next(".select2-container").hide(), setTimeout((function() {
                                a = !1
                            }), 200)
                        })), $("#fonts_select_activator").mouseup((function() {
                            a ? $("#entry_font").select2("close") : $("#entry_font").select2("open")
                        }))
                    } else {
                        e = {
                            width: "resolve",
                            placeholder: "Select a Font",
                            templateResult: function(e) {
                                return e.id ? '<span style="font-family: gg-' + e.element.value + '">' + e.element.value + "</span>" : e.text
                            },
                            templateSelection: function() {
                                return 3 === t ? "" : "<i class='fas fa-font-case'></i>"
                            },
                            dropdownAutoWidth: !0,
                            dropdownParent: $("#text_entry_form_modal"),
                            escapeMarkup: function(e) {
                                return e
                            }
                        };
                        $("#entry_font").select2(e)
                    }
                }(), $("#icon_preview_container").resizable({
                    containment: "#new_and_edit_entry_modification_area",
                    minWidth: et,
                    minHeight: tt,
                    handles: "e, w"
                }), $("#icon_preview_container").bind("resize", (function() {
                    var e = $("#icon_preview").width(),
                        t = $("#icon_preview").height(),
                        a = $("#icon_preview_container");
                    ne(a);
                    var n = a.width(),
                        i = Math.round(n * t / e);
                    $("#entry_icon_width").val(n), $("#entry_icon_height").val(i), $("#icon_preview").width(n), $("#icon_preview").height(i), $("#icon_preview_container").height("auto"), $("#icon_preview_container").width("auto")
                })), $("#giphy_preview_container").resizable({
                    containment: "#new_and_edit_entry_modification_area",
                    minWidth: et,
                    minHeight: tt,
                    handles: "e, w"
                }), $("#giphy_preview_container").bind("resize", (function() {
                    var e = $("#giphy_preview").width(),
                        t = $("#giphy_preview").height(),
                        a = $("#giphy_preview_container");
                    ne(a);
                    var n = a.width(),
                        i = Math.round(n * t / e);
                    $("#entry_giphy_width").val(n), $("#entry_giphy_height").val(i), $("#giphy_preview").width(n), $("#giphy_preview").height(i), $("#giphy_preview_container").height("auto"), $("#giphy_preview_container").width("auto")
                })), function() {
                    var e = $("#canvas_preview_container .canvas_page").length - 1,
                        t = $(".page_slider");
                    t.slider({
                        max: e,
                        min: 0,
                        step: 1,
                        value: 0,
                        animate: !0,
                        slide: function(e, t) {
                            we(t.value)
                        },
                        stop: function(e, t) {
                            ze(t.value, 100), $("#canvas_page_cover").css({
                                "background-color": "white"
                            })
                        }
                    }), t.find(".ui-slider-handle").html('<div class="tooltip top slider-tip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>');
                    var a = t.slider("option", "value");
                    t.find(".ui-slider-handle .slider-tip .tooltip-inner").text(a), t.find(".ui-slider-handle").hover((function() {
                        $(this).find(".slider-tip").show()
                    }), (function() {
                        $(this).find(".slider-tip").hide()
                    }))
                }(), function() {
                    function e(e) {
                        if (!a || 3 === t) {
                            let e = Ae(),
                                t = Ee();
                            if (e || t) return $("#overlap_fixed_alert").hide(), e ? $("#auto_move_alert_text").html("Overlap! Move your entry?") : t && $("#auto_move_alert_text").html("Overrun! Move your entry?"), $("#auto_move_alert").show(), $("html").width() < 960 && $("html").animate({
                                scrollTop: $("#canvas_timer").offset().top
                            }, 500), void(a = !0)
                        }
                        e()
                    }
                    var a = !1;
                    $(".submit_all_entries_button, #submit_all_entries_button_mobile").click((function() {
                        var t = parseInt($("#entry_page_number").val(), 10);
                        $("#canvas_page_" + t).hasClass("locked_page") ? $("#non_admin_lock_screen_alert").show() : We((function() {
                            V() && ($("#auto_move_alert").is(":hidden") ? e((function() {
                                J()
                            })) : J())
                        }))
                    })), 3 === t && ($("#signer_create_account_button").click((function() {
                        if ($(this).popover("hide"), clearTimeout(_t), !is_signed_in) {
                            const e = $("#sign_in_modal"),
                                t = $("#sign_up_modal");
                            let a = function(e) {
                                current_user_signer_email = e.user_email, $("#signer_create_account_button").hide(), We(), updateHeaderAfterSignedIn()
                            };
                            bind_signin_events(a), bind_signup_events(a);
                            let n = document.getElementsByName("csrf-token")[0].content,
                                i = ["google_oauth_sign_in_button_container", "google_oauth_sign_up_button_container"];
                            return GoogleOauthHelper.init(i, n, a, $(".google_auth_validation_message_container")), t.modal("show"), e.find(".close").show(), t.find(".close").show(), !1
                        }
                    })), $("#signer_create_account_button").hover((function() {
                        F("hover")
                    })), $("#auto_move_alert_yes_button").click((function() {
                        lt = !0, $("#overlap_fixed_alert").show(), $("#auto_move_alert").hide(), Ge((function() {
                            Se(), setTimeout((function() {
                                $("#overlap_fixed_alert").hide()
                            }), 1e3)
                        }))
                    })), $("#auto_move_alert_no_button").click((function() {
                        J(), P()
                    })), $("#submit_edit_move_entry_button").click((function() {
                        user_can_card_admin ? P() : e((function() {
                            P()
                        }))
                    }))), $("#overlap_modal_ignore").click((function() {
                        a = !0, $("#overlap_modal").modal("hide")
                    })), $("#overlap_modal_continue").click((function() {
                        $("#overlap_modal").modal("hide")
                    })), Be()
                }(), function() {
                    if (2 === t || 3 === t) {
                        function e(e) {
                            var t;
                            e.stopPropagation(), e.preventDefault(), t = (e.originalEvent.clipboardData || window.clipboardData).getData("Text"), document.queryCommandSupported("insertText") ? document.execCommand("insertText", !1, t) : document.execCommand("paste", !1, t)
                        }
                        $("#contenteditable_entry_text").on("paste", (function(t) {
                            e(t)
                        })), $("#contenteditable_entry_text").on("keydown", (function(e) {
                            if (window.getSelection && 8 === e.which) {
                                var t = window.getSelection();
                                if (!t.isCollapsed || !t.rangeCount) return;
                                var a = t.getRangeAt(t.rangeCount - 1);
                                if (3 === a.commonAncestorContainer.nodeType && a.startOffset > 0) return;
                                var n = document.createRange();
                                if (t.anchorNode !== this) n.selectNodeContents(this), n.setEndBefore(t.anchorNode);
                                else {
                                    if (!(t.anchorOffset > 0)) return;
                                    n.setEnd(this, t.anchorOffset)
                                }
                                n.setStart(this, n.endOffset - 1);
                                var i = n.cloneContents().lastChild;
                                i && "false" === i.contentEditable && (n.deleteContents(), e.preventDefault())
                            }
                        }))
                    }
                }(), function() {
                    if (2 === t || 3 === t) {
                        let a = at[nt];
                        $("#contenteditable_entry_text").keyup((function() {
                            c(a, "entry_char_counter", $("#contenteditable_entry_text"))
                        }))
                    } else {
                        function e(e, t, a) {
                            var n = $("#" + e).val(),
                                i = n.length;
                            return i > t ? ($("#" + a).html(t + " characters max."), $("#" + e).val(n.substr(0, t)), !1) : ($("#" + a).html(t - i + " characters left"), !0)
                        }
                        $((function() {
                            let t = at[nt];
                            $("#entry_text").keyup((function() {
                                e("entry_text", t, "entry_char_counter")
                            }))
                        }))
                    }
                }(), $("#delete_entry_modal").on("hide.bs.modal", (function() {
                    ue()
                })), function() {
                    function e(e) {
                        let t = $("#delete_entry_modal");
                        t.data("id", e);
                        let a = "Are you sure you want to delete this? There is no undo.<br>";
                        t.find(".modal-body").html(a), t.modal("show")
                    }
                    $(".go-back-modal-text-entry-button").click((function() {
                            ce()
                        })),
                        $(".cancel_image_entry_modal").click((function() {
                            $("#photo_entry_form_modal").modal("hide"), re(), me()
                        })), $("#cancel_entry_button, #cancel_entry_button_mobile").click((function() {
                            be()
                        })), $(".delete_entry_clickable").click((function() {
                            if (n(), null === ot) {
                                $(".card_left_side_options").show(), $(".sign_this_card_button_container").show(), $(".sign_this_card_button_mobile_container").addClass("d-sm-block").show();
                                switch ($(this).data("entry_type")) {
                                    case "text":
                                        ge();
                                        break;
                                    case "photo":
                                        me()
                                }
                            } else e(ot);
                            $(".entry_edit_clickable, .entry_move_clickable").addClass("entry_interactable_cursor"), fe(), te()
                        })), $("#cancel_entry_move_clickable").click((function() {
                            null === ot ? S() : e(ot), fe()
                        })), $("#cancel_icon_clickable").click((function() {
                            3 === t && $("#sign_page_right_side_menus").show(), re()
                        })), $("#cancel_photo_clickable").click((function() {
                            3 === t && ($("#auto_move_alert").hide(), $("#overlap_fixed_alert").hide(), $(".card_left_side_options").show(), $(".sign_this_card_button_container").show(), $(".sign_this_card_button_mobile_container").addClass("d-sm-block").show()), fe(), me()
                        }))
                }(), function() {
                    if (0 === $("#canvas_preview_container .canvas_page").length - 1) return $("#main_canvas_area .canvas_next").hide(), void $("#main_canvas_area .canvas_prev").hide();
                    $("#main_canvas_area").on("click", ".canvas_next", (function() {
                        ze(parseInt($("#current_page_number").text().trim(), 10) + 1, 1e3), $("#non_admin_lock_screen_alert").hide()
                    })), $("#main_canvas_area").on("click", ".canvas_prev", (function() {
                        var e = parseInt($("#current_page_number").text().trim(), 10);
                        ze(e - 1, 1e3), $("#non_admin_lock_screen_alert").hide(), 1 === e && $("#canvas_page_cover").css({
                            "background-color": "white"
                        })
                    }))
                }(), function() {
                    function e(e) {
                        $("#photo_upload_form_result").fadeIn("fast").html(e), $("#photo_upload_form").fadeIn("slow"), $("#processing_upload_photo_message").css("display", "none"), $("#photo_image_validation_message").hide(), $.unblockUI()
                    }
                    let t = {
                        url: "/entries/validate_photo_entry",
                        success: function(t) {
                            let a;
                            switch (t.status) {
                                case "success":
                                    $("#photo_preview").width("100%"), $("#photo_preview").height("100%");
                                    let n = $("#photo_preview_container");
                                    n.css("display", "block"), $("#photo_entry_menu").show(), $("#upload_confirm").css("display", "none");
                                    let i = t.data.width;
                                    n.width(i);
                                    let r = t.data.height;
                                    n.height(r), n.css("left", 200), n.css("top", 200), n.data("is_flip_x", "no"), n.data("is_flip_y", "no"), n.data("angle", "0"), ne(n), $("#photo_preview").css("transform", "scale(1, 1)"), n.css("transform", "rotate(0deg)"), $("#photo_upload_form_choose_file").hide(), a = '\n                <p class="alert alert-success text-center">\n                  Your photo is ready.\n                </p\n              ', e(a), $("#submit_photo_entry_modal").click(), ct || (ct = EntryMoveableCreator.create());
                                    break;
                                case "error":
                                    a = `<p class="alert alert-danger text-center">\n                ${t.data.errors.join("<br/>")}\n              </p>`, e(a), I()
                            }
                        }
                    };
                    $("#photo_upload_form").ajaxForm(t)
                }(), $("#submit_photo_entry_modal").click((function() {
                    if (!T()) return !1;
                    3 === t && ($(".card_left_side_options").hide(), $(".sign_this_card_button_container").hide(), $(".sign_this_card_button_mobile_container").removeClass("d-sm-block").hide());
                    var e = $("#photo_entry_modal_signer_name").val().trim();
                    $("#photo_image_validation_message").hide(), $("#photo_entry_modal_signer_name_validation").hide(), current_user_signer_name || window.localStorage.setItem("signer_name", e), $("#photo_entry_form_modal").modal("hide"), ue(), te(), L("#photo_preview_container")
                })), $("#photo_upload_file").change((function(e) {
                    if ($("#photo_upload_file").val()) {
                        $("#processing_upload_photo_message").css("display", "block"), $("#photo_upload_form").css("display", "none"), $("#photo_entry_form_modal").modal("hide"), $.blockUI(blockUILoadingConfig);
                        let t = e.target.files[0],
                            a = window.URL.createObjectURL(t);
                        $("#photo_preview").find("img").attr("src", a), $("#photo_upload_form").submit()
                    }
                })), $("#photo_entry_menu").find(".flip_entry_clickable").click((function() {
                    const e = $(this).data("axis");
                    if (!["x", "y"].includes(e)) return;
                    let t;
                    t = "yes" === $("#photo_preview_container").data(`is_flip_${e}`) ? "no" : "yes", $("#photo_preview_container").data(`is_flip_${e}`, t);
                    let a = 1,
                        n = 1;
                    "yes" === $("#photo_preview_container").data("is_flip_x") && (a = -1), "yes" === $("#photo_preview_container").data("is_flip_y") && (n = -1);
                    const i = `scale(${a}, ${n})`;
                    $("#photo_preview").css("transform", i)
                })), $("#cancel_text_entry_modal").click((function() {
                    xe()
                })), $("#submit_text_entry_modal").click((function(e) {
                    if (2 === t || 3 === t) {
                        if (p($("#contenteditable_entry_text")) < 0) return $("#text_entry_text_is_too_long_validation").fadeIn("fast"), e.preventDefault(), !1
                    }
                    if (1 === t || 2 === t) {
                        var a = $("#text_entry_modal_signer_name").val().trim();
                        if ("" === a) return $("#text_entry_modal_signer_name_validation").fadeIn("fast"), e.preventDefault(), !1;
                        var n = "";
                        if (1 === t ? n = $("#entry_text").val().trim() : 2 === t && (n = $("#contenteditable_entry_text").text()), $("#finalize_entry_text_form .entry_excluded_signer_name").is(":checked") && "" === n) return $("#text_entry_text_is_empty_validation").fadeIn("fast"), e.preventDefault(), !1
                    }
                    if (1 === t) {
                        var i = $("#modal_text_preview").attr("src");
                        $("#text_preview").attr("src", i), $("#text_preview").width("auto")
                    }
                    $("#text_entry_modal_signer_name").siblings(".invalid-feedback").hide(), current_user_signer_name || window.localStorage.setItem("signer_name", a), $("#info_container").hide(), $(".sign-this-card-button").hide(), $(".go-back-modal-text-entry-button").show(), $("#text_entry_form_modal").modal("hide"), $("#text_preview_container").fadeIn("fast").width("auto").height("auto"), O(), null === N() && Ge((function() {
                        var e = qe();
                        ze(e.recommended_page, 1e3), $("#text_preview_container").css({
                            left: e.x_coordinate,
                            top: e.y_coordinate
                        })
                    })), te()
                })), $("#select_info_tab").click((function() {
                    $("#info_container").fadeIn("fast")
                })), $(".sign-this-card-button").click((function() {
                    if (3 === t ? ($(".card_left_side_options").hide(), $(".sign_this_card_button_container").hide(), $(".sign_this_card_button_mobile_container").removeClass("d-sm-block").hide(), $("#text_entry_signer_name_validation").hide(), $("#text_entry_text_is_too_long_validation").hide(), it = null) : $("#text_entry_modal_signer_name_validation").hide(), $("#entry_is_exclude_name").prop("checked", !1), U(!1), null === N()) {
                        se();
                        var e = a();
                        $("#text_entry_modal_signer_name").val(e), j("left"), W()
                    }
                    ce(), L("#text_preview_container")
                })), $(".add-photo-button").click((function() {
                    $("#photo_upload_form_result").hide(), $("#photo_upload_form_choose_file").show();
                    var e = a();
                    $("#photo_entry_modal_signer_name").val(e), current_user_signer_email ? $("#photo_upload_file").click() : ($("#photo_image_validation_message").hide(), $("#photo_entry_modal_signer_name_validation").hide(), I())
                })), $(".add-giphy-button").click((function() {
                    let e = a();
                    $("#giphy_entry_modal_signer_name").val(e), $("#giphy_entry_form_modal").modal("show")
                })), $("#giphy_entry_form_modal").on("shown.bs.modal", (function() {
                    "" === $("#giphy_entry_modal_signer_name").val() && $("#giphy_entry_modal_signer_name").focus()
                })), $("#icons .icon").click((function() {
                    e($(this))
                })), $("#text_entry_form_modal").modal("hide"), $("#text_entry_form_modal").on("shown.bs.modal", (function() {
                    Ze()
                })), $e(), ze(STARTPAGE, 0), $("#detail_edit_entry").click((function() {
                    ve()
                })), $(".delete_entry_button").click((function() {
                    let e = this.id.replace("delete_entry_", ""),
                        t = $(this).parents(".edit_entry"),
                        a = $.trim($(t).find(".created_date").html()),
                        n = "Are you sure you want to delete this? There is no undo.<br>";
                    n += "<strong>" + $.trim($(t).find(".signed_by_email").html()) + "</strong>", n += "<strong>" + a + "</strong>";
                    let i = $("#delete_entry_modal");
                    i.data("id", e), i.find(".modal-body").html(n), i.modal("show")
                })), $("#confirm_entry_delete_button").click((function() {
                    n();
                    var e = $("#delete_entry_modal").data("id"),
                        a = $("#delete_entry_" + e).data("page");
                    $.blockUI(blockUILoadingConfig), $.ajax({
                        method: "POST",
                        url: "/entries/" + e + "/delete",
                        success: function(n) {
                            3 === t ? (ISSIGNING = !1, xe(), me(), re(), oe(), S(), $("#entry_" + e).remove()) : (n && ($("#delete_entry_" + e).closest(".edit_entry").remove(), $("#entry_" + e).fadeOut("fast"), Ne()), 0 === $(".edit_entry[data-page=" + a + "], .edit_entry.active").length && ve(), Be());
                            $.unblockUI()
                        }
                    }).fail((function(t) {
                        $("#entry_" + e).fadeIn("fast"), alert(t.responseJSON.message)
                    })), $("#delete_entry_modal").modal("hide"), fe()
                })), $(".move_entry_button").click((function() {
                    i(this)
                })), $(".cancel_move_entry_clickable").click(r), $(".move_entry_clickable").click(s), $(".edit_entry_button").click((function() {
                    de(this)
                })), 3 === t) {
                var l = ["text", "giphy", "icon", "photo"];
                $("#canvas_preview_container").click((function(e) {
                    var t;
                    for (t = 0; t < l.length; t += 1) {
                        var a = l[t] + "_preview_container";
                        if (e.target.id === a || $("#" + a).find(e.target).length) {
                            0;
                            break
                        }
                    }
                    "entry_edit_move_preview_container" === e.target.id || $("#entry_edit_move_preview_container").find(e.target).length
                })), $("#canvas_preview_container").on("click", ".canvas_page.active .entry_edit_clickable", (function(e) {
                    if (e.stopPropagation(), Y()) return;
                    $(".entry_interactable_cursor").removeClass("entry_interactable_cursor"), $.blockUI(blockUILoadingConfig);
                    const t = $(this).data("entry_type");
                    ot = parseInt($(this).attr("id").replace("entry_", ""), 10), be(), $(".entry").fadeIn("fast"), $(".sign_this_card_button_container").hide(), $.ajax({
                        method: "GET",
                        url: "/entries/" + ot + "/details",
                        success: function(e) {
                            if ($.unblockUI(), Object.keys(e.data).length > 0) {
                                var a = !0;
                                "text" === t && $(this).hasClass("entry_edit_clickable") && (a = !1), he(e, a), ue()
                            }
                        }
                    })
                })), $("#canvas_preview_container").on("click", ".canvas_page.active .entry_move_clickable", (function() {
                    Y() || (z($(this).attr("id")), ue())
                })), $("#canvas_preview_container").on("click", ".delete_page_clickable", (function(e) {
                    e.preventDefault();
                    const t = $(this);
                    t.prop("disabled", !0), ie(), t.prop("disabled", !1)
                })), $("#confirm_page_delete_button").click((function() {
                    const e = $("#entry_page_number").val(),
                        t = $(this).parent();
                    t.attr("action", "/cards/" + ref_canvas_key + "/page/" + e + "/delete_page"), $.blockUI(blockUILoadingConfig), t.submit()
                }))
            }
        })), $("#canvas_preview_container").on("click", ".page_is_unlocked_button", (function(e) {
            e.preventDefault();
            var t = $(this);
            t.prop("disabled", !0);
            const a = parseInt($("#entry_page_number").val());
            $.ajax({
                method: "post",
                data: {
                    page: a,
                    locked: !0
                },
                url: "/cards/" + ref_canvas_key + "/update_page_locked_status"
            }).done((function() {
                locked_pages.add(a), Me(a, {
                    refresh: !0
                }), t.tooltip("hide"), t.hide(), t.closest(".canvas_page").find(".page_is_locked_button").show(), $("#add_unlock_screen_alert").hide(), $("#add_lock_screen_alert").show(), setTimeout((function() {
                    $("#add_lock_screen_alert").fadeOut("fast")
                }), 3e3), parseInt($("#current_page_number").text().trim(), 10) === $("#canvas_preview_container .canvas_page").length - 1 - 1 && Ge((function() {
                    $(".blank_page").find(".page_is_locked_button").hide(), $(".blank_page").find(".page_is_unlocked_button").show()
                }))
            })).always((function() {
                t.prop("disabled", !1)
            }))
        })), $("#canvas_preview_container").on("click", ".page_is_locked_button", (function(e) {
            e.preventDefault();
            var t = $(this);
            t.prop("disabled", !0);
            const a = parseInt($("#entry_page_number").val());
            $.ajax({
                method: "post",
                data: {
                    page: a,
                    locked: !1
                },
                url: "/cards/" + ref_canvas_key + "/update_page_locked_status"
            }).done((function() {
                locked_pages.delete(a), Me(a, {
                    refresh: !0
                }), t.tooltip("hide"), t.hide(), t.closest(".canvas_page").find(".page_is_unlocked_button").show(), $("#add_lock_screen_alert").hide(), $("#add_unlock_screen_alert").show(), setTimeout((function() {
                    $("#add_unlock_screen_alert").fadeOut("fast")
                }), 3e3)
            })).always((function() {
                t.prop("disabled", !1)
            }))
        })), $("#canvas_preview_container").on("click", ".canvas_page.locked_page", (function() {
            $("#non_admin_lock_screen_alert").show()
        }));
    ! function() {
        function e() {
            $("#giphy_entry_menu").find(".nav-link").removeClass("active"), "stickers" === s ? ($(".add_giphy_sticker_link").addClass("active"), $("#giphy_search_input").attr("placeholder", "Search stickers"), $("#giphy_images").removeClass("gifs").addClass("stickers")) : ($(".add_giphy_gif_link").addClass("active"), $("#giphy_search_input").attr("placeholder", "Search GIFs"), $("#giphy_images").removeClass("stickers").addClass("gifs")), $("#giphy_images").html("");
            o($("#giphy_search_input").val())
        }

        function a(e) {
            $(".giphy_image").removeClass("border-info"), $(".giphy_image").addClass("border-white"), $(e).removeClass("border-white"), $(e).addClass("border-info");
            var t = $(e).data("downsized_medium");
            $("#giphy_preview").attr("src", t), $("#giphy_preview").width(220), $("#giphy_preview").height("auto"), $("#entry_giphy_url").val(t);
            const a = $("#giphy_preview_container");
            ne(a), a.fadeIn("fast");
            "" === $("#entry_giphy_eid").val() && $("#cancel_entry_button_mobile").show()
        }

        function n() {
            $("#giphy_images .giphy_image").removeClass("border-info"), $("#giphy_images .giphy_image").addClass("border-white"), $("#giphy_preview_container").hide(), $("#cancel_entry_button_mobile").hide(), $("#entry_giphy_posX").val("-1"), $("#entry_giphy_posY").val("-1"), $("#entry_giphy_width").val("-1"), $("#entry_giphy_height").val("-1"), $("#entry_giphy_url").val(""), te(), ue()
        }

        function i(e) {
            let t = new Spinner({}),
                a = $("#giphy_container").find(".spinner")[0];
            t.spin(a);
            let n = "https://tenor.googleapis.com/v2/search?";
            const i = ["key=" + "AIzaSyAPjx0xF2FgbpxJe60S-QdKvYozNrVyFGY", "client_key=test", "limit=50", "contentfilter=high"];
            "" !== e.trim() ? i.push("q=" + e) : n = "https://tenor.googleapis.com/v2/featured?", "stickers" === s && i.push("searchfilter=sticker"), l && i.push("pos=" + l);
            const r = n + i.join("&");
            let o = [];
            return $.ajax({
                method: "GET",
                url: r,
                async: !1,
                success: function(e) {
                    l = e.next, o = e.results, t.stop()
                }
            }), o
        }

        function r(e) {
            const t = i(e);
            let a, n = "";
            for (a = 0; a < t.length; a += 1) {
                let e = t[a],
                    i = e?.media_formats?.tinygif?.url;
                i || (i = e?.media_formats?.tinygif?.url);
                let r = e?.media_formats?.gif_transparent?.url;
                r || (r = e?.media_formats?.mediumgif?.url), null !== i && null !== r && (n += `\n            <img class="giphy_image mb-1 border border-white"\n                 src="${i}"\n                 data-downsized_medium="${r}" />\n          `)
            }
            return n
        }

        function o(e) {
            let t = '<div class="giphy_image_set">';
            t += r(e), t += "</div>", $("#giphy_images").append(t)
        }
        let s = "gifs",
            l = null;
        var c = 1e3;
        $("#giphy_search_input").bind("input propertychange", FormHelper.debounce((function() {
            const e = $("#giphy_search_input").val();
            $("#giphy_images").html(""), l = null, o(e)
        }), c)), $(".add_giphy_gif_link").click((function() {
            s = "gifs", e()
        })), $(".add_giphy_sticker_link").click((function() {
            s = "stickers", e()
        })), $(".add-giphy-button").click((function() {
            "" === $("#giphy_images").html() && e()
        })), $("#giphy_images").scroll((function() {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                o($.trim($("#giphy_search_input").val()))
            }
        })), $("#giphy_images").on("click", ".giphy_image", (function() {
            3 === t && ($(".card_left_side_options").hide(), $(".sign_this_card_button_container").hide(), $(".sign_this_card_button_mobile_container").removeClass("d-sm-block").hide());
            const e = $("#giphy_entry_modal_signer_name").val().trim();
            if ("" === e) return $("#giphy_entry_modal_signer_name_validation").fadeIn("fast"), !1;
            $("#giphy_entry_modal_signer_name_validation").hide(), current_user_signer_name || window.localStorage.setItem("signer_name", e), a($(this)), $("#giphy_entry_form_modal").modal("hide"), ue(), te(), L("#giphy_preview_container")
        })), $(".cancel_giphy_clickable, #cancel_entry_button_mobile").click((function() {
            3 === t && ($("#auto_move_alert").hide(), $("#overlap_fixed_alert").hide(), $(".card_left_side_options").show(), $(".sign_this_card_button_container").show(), $(".sign_this_card_button_mobile_container").addClass("d-sm-block").show(), $(".entry_edit_clickable, .entry_move_clickable").addClass("entry_interactable_cursor")), n(), fe()
        }))
    }();
    ! function() {
        function e(e) {
            const t = $("#contenteditable_entry_area").innerHeight(),
                a = (e - t) / window.innerHeight,
                n = $("#text_entry_options_with_dimensions").innerHeight();
            if (a < .5) {
                const e = 3;
                o.css({
                    top: n + e,
                    bottom: "auto"
                })
            } else if (a >= .5) {
                const e = 15;
                o.css({
                    top: "auto",
                    bottom: t + n + e
                })
            }
        }
        $("#contenteditable_entry_text, #contenteditable_entry_signer_name").click((function() {
            var e = i();
            it = e
        })), $("#emoji-button").bind("mousedown", (function() {
            var e = i();
            "true" !== e.endContainer.parentElement.contentEditable && "true" !== e.endContainer.contentEditable || (it = e)
        }));
        const a = {
                theme: "light",
                set: "native",
                emojiVersion: "14",
                icons: "auto",
                emojiButtonSize: "28",
                emojiSize: "20",
                maxFrequentRows: "1",
                dynamicWidth: !0,
                onEmojiSelect: function({
                    native: e
                }) {
                    if (3 === t) r(e);
                    else if (2 === t) {
                        document.querySelector("#contenteditable_entry_text").innerHTML += e
                    } else {
                        document.querySelector("#entry_text").value += e
                    }
                    W(), $(this.element).hide()
                }
            },
            n = new EmojiMart.Picker(a),
            o = $(n);
        let s = !1;
        $("#emoji-button").click((function({
            clientY: t
        }) {
            if (!s) {
                const e = $("#text_entry_options_with_dimensions").innerWidth();
                o.css({
                    width: e
                }).addClass("toolbar-dropdown-shadow rounded-bottom rounded-top border-bottom border-left border-right"), s = !0
            }
            e(t), o.toggle()
        })), 3 === t && $("body").mouseup((function(e) {
            o.is(e.target) || 0 !== o.has(e.target).length || $("#emoji-button").is(e.target) || 0 !== $("#emoji-button").has(e.target).length || o.hide()
        })), $("#entry_char_counter_and_emoji_button_container").append(o)
    }()
}

function bind_signin_events(e) {
    function t() {
        var e = document.getElementById("session_password");
        "password" === e.type ? (e.type = "text", $("#show_hide_session_password i").removeClass("fa-eye-slash"), $("#show_hide_session_password i").addClass("fa-eye")) : (e.type = "password", $("#show_hide_session_password i").removeClass("fa-eye"), $("#show_hide_session_password i").addClass("fa-eye-slash"))
    }
    $("#show_hide_session_password").off("click", t).on("click", t);
    var a = function(e) {
        window.location.href = "redirect_url" in e ? e.redirect_url : "/account"
    };
    "function" == typeof e && (a = e);
    var n = new Spinner({});
    $("#signin_form").ajaxForm({
        url: "/signin",
        forceSync: !0,
        beforeSubmit: function() {
            $("#signin_button").css("visibility", "hidden");
            var e = $("#signin_form").find(".spinner")[0];
            n.spin(e)
        },
        success: function(e) {
            var t = e.data;
            switch (e.status) {
                case "error":
                    $("#signin_error_message").hide().html("<p>" + t.message + "</p>").fadeIn("fast"), $("#session_password").val(""), n.stop(), $("#signin_button").css("visibility", "visible");
                    break;
                case "success":
                    a(t)
            }
        }
    })
}

function bind_signup_events(e) {
    function t(e) {
        return String(e).charAt(0).toUpperCase() + String(e).slice(1)
    }

    function a() {
        var e = document.getElementById("user_password");
        "password" === e.type ? (e.type = "text", $("#show_hide_user_password i").removeClass("fa-eye-slash"), $("#show_hide_user_password i").addClass("fa-eye")) : (e.type = "password", $("#show_hide_user_password i").removeClass("fa-eye"), $("#show_hide_user_password i").addClass("fa-eye-slash"))
    }
    $("#show_hide_user_password").off("click", a).on("click", a);
    var n = function(e) {
        window.location.href = "redirect_url" in e ? e.redirect_url : "/account"
    };
    "function" == typeof e && (n = e);
    var i = new Spinner({});
    $("#signup_form").ajaxForm({
        url: "/register",
        forceSync: !0,
        beforeSubmit: function() {
            $("#signup_button").css("visibility", "hidden");
            var e = $("#signup_form").find(".spinner")[0];
            i.spin(e)
        },
        success: function(e) {
            var a = e.data;
            switch (e.status) {
                case "error":
                    var r = [];
                    for (var o in a) {
                        var s;
                        for (s = 0; s < a[o].length; s += 1) {
                            let e = `${t(o)} ${a[o][s]}.`;
                            r.push(e)
                        }
                    }
                    var l = r.join("<br/>");
                    $("#signup_error_message").hide().html("<p>" + l + "</p>").fadeIn("fast"), i.stop(), $("#signup_button").css("visibility", "visible");
                    break;
                case "success":
                    n(a)
            }
        }
    })
}! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}((function(e, t) {
    function a() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function n() {
        var e = new Date;
        return a(e.getFullYear(), e.getMonth(), e.getDate())
    }

    function i(e, t) {
        return e.getUTCFullYear() === t.getUTCFullYear() && e.getUTCMonth() === t.getUTCMonth() && e.getUTCDate() === t.getUTCDate()
    }

    function r(a, n) {
        return function() {
            return n !== t && e.fn.datepicker.deprecated(n), this[a].apply(this, arguments)
        }
    }

    function o(e) {
        return e && !isNaN(e.getTime())
    }

    function s(t, a) {
        function n(e, t) {
            return t.toLowerCase()
        }
        var i = e(t).data(),
            r = {},
            o = new RegExp("^" + a.toLowerCase() + "([A-Z])");
        for (var s in a = new RegExp("^" + a.toLowerCase()), i) a.test(s) && (r[s.replace(o, n)] = i[s]);
        return r
    }

    function l(t) {
        var a = {};
        if (v[t] || (t = t.split("-")[0], v[t])) {
            var n = v[t];
            return e.each(f, (function(e, t) {
                t in n && (a[t] = n[t])
            })), a
        }
    }
    var c = function() {
            var t = {
                get: function(e) {
                    return this.slice(e)[0]
                },
                contains: function(e) {
                    for (var t = e && e.valueOf(), a = 0, n = this.length; a < n; a++)
                        if (0 <= this[a].valueOf() - t && this[a].valueOf() - t < 864e5) return a;
                    return -1
                },
                remove: function(e) {
                    this.splice(e, 1)
                },
                replace: function(t) {
                    t && (e.isArray(t) || (t = [t]), this.clear(), this.push.apply(this, t))
                },
                clear: function() {
                    this.length = 0
                },
                copy: function() {
                    var e = new c;
                    return e.replace(this), e
                }
            };
            return function() {
                var a = [];
                return a.push.apply(a, arguments), e.extend(a, t), a
            }
        }(),
        d = function(t, a) {
            e.data(t, "datepicker", this), this._process_options(a), this.dates = new c, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = e(t), this.isInput = this.element.is("input"), this.inputField = this.isInput ? this.element : this.element.find("input"), this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn"), this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"), this.picker = e(m.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.o.calendarWeeks && this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", (function(e, t) {
                return Number(t) + 1
            })), this._process_options({
                startDate: this._o.startDate,
                endDate: this._o.endDate,
                daysOfWeekDisabled: this.o.daysOfWeekDisabled,
                daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
                datesDisabled: this.o.datesDisabled
            }), this._allow_update = !1, this.setViewMode(this.o.startView), this._allow_update = !0, this.fillDow(), this.fillMonths(), this.update(), this.isInline && this.show()
        };
    d.prototype = {
        constructor: d,
        _resolveViewName: function(t) {
            return e.each(m.viewModes, (function(a, n) {
                if (t === a || -1 !== e.inArray(t, n.names)) return t = a, !1
            })), t
        },
        _resolveDaysOfWeek: function(t) {
            return e.isArray(t) || (t = t.split(/[,\s]*/)), e.map(t, Number)
        },
        _check_template: function(a) {
            try {
                return a !== t && "" !== a && ((a.match(/[<>]/g) || []).length <= 0 || e(a).length > 0)
            } catch (e) {
                return !1
            }
        },
        _process_options: function(t) {
            this._o = e.extend({}, this._o, t);
            var i = this.o = e.extend({}, this._o),
                r = i.language;
            v[r] || (r = r.split("-")[0], v[r] || (r = u.language)), i.language = r, i.startView = this._resolveViewName(i.startView), i.minViewMode = this._resolveViewName(i.minViewMode), i.maxViewMode = this._resolveViewName(i.maxViewMode), i.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, i.startView)), !0 !== i.multidate && (i.multidate = Number(i.multidate) || !1, !1 !== i.multidate && (i.multidate = Math.max(0, i.multidate))), i.multidateSeparator = String(i.multidateSeparator), i.weekStart %= 7, i.weekEnd = (i.weekStart + 6) % 7;
            var o = m.parseFormat(i.format);
            i.startDate !== -1 / 0 && (i.startDate ? i.startDate instanceof Date ? i.startDate = this._local_to_utc(this._zero_time(i.startDate)) : i.startDate = m.parseDate(i.startDate, o, i.language, i.assumeNearbyYear) : i.startDate = -1 / 0), i.endDate !== 1 / 0 && (i.endDate ? i.endDate instanceof Date ? i.endDate = this._local_to_utc(this._zero_time(i.endDate)) : i.endDate = m.parseDate(i.endDate, o, i.language, i.assumeNearbyYear) : i.endDate = 1 / 0), i.daysOfWeekDisabled = this._resolveDaysOfWeek(i.daysOfWeekDisabled || []), i.daysOfWeekHighlighted = this._resolveDaysOfWeek(i.daysOfWeekHighlighted || []), i.datesDisabled = i.datesDisabled || [], e.isArray(i.datesDisabled) || (i.datesDisabled = i.datesDisabled.split(",")), i.datesDisabled = e.map(i.datesDisabled, (function(e) {
                return m.parseDate(e, o, i.language, i.assumeNearbyYear)
            }));
            var s = String(i.orientation).toLowerCase().split(/\s+/g),
                l = i.orientation.toLowerCase();
            if (s = e.grep(s, (function(e) {
                    return /^auto|left|right|top|bottom$/.test(e)
                })), i.orientation = {
                    x: "auto",
                    y: "auto"
                }, l && "auto" !== l)
                if (1 === s.length) switch (s[0]) {
                    case "top":
                    case "bottom":
                        i.orientation.y = s[0];
                        break;
                    case "left":
                    case "right":
                        i.orientation.x = s[0]
                } else l = e.grep(s, (function(e) {
                    return /^left|right$/.test(e)
                })), i.orientation.x = l[0] || "auto", l = e.grep(s, (function(e) {
                    return /^top|bottom$/.test(e)
                })), i.orientation.y = l[0] || "auto";
            if (i.defaultViewDate instanceof Date || "string" == typeof i.defaultViewDate) i.defaultViewDate = m.parseDate(i.defaultViewDate, o, i.language, i.assumeNearbyYear);
            else if (i.defaultViewDate) {
                var c = i.defaultViewDate.year || (new Date).getFullYear(),
                    d = i.defaultViewDate.month || 0,
                    _ = i.defaultViewDate.day || 1;
                i.defaultViewDate = a(c, d, _)
            } else i.defaultViewDate = n()
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(e) {
            for (var a, n, i, r = 0; r < e.length; r++) a = e[r][0], 2 === e[r].length ? (n = t, i = e[r][1]) : 3 === e[r].length && (n = e[r][1], i = e[r][2]), a.on(i, n)
        },
        _unapplyEvents: function(e) {
            for (var a, n, i, r = 0; r < e.length; r++) a = e[r][0], 2 === e[r].length ? (i = t, n = e[r][1]) : 3 === e[r].length && (i = e[r][1], n = e[r][2]), a.off(n, i)
        },
        _buildEvents: function() {
            var t = {
                keyup: e.proxy((function(t) {
                    -1 === e.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                }), this),
                keydown: e.proxy(this.keydown, this),
                paste: e.proxy(this.paste, this)
            };
            !0 === this.o.showOnFocus && (t.focus = e.proxy(this.show, this)), this.isInput ? this._events = [
                [this.element, t]
            ] : this.component && this.inputField.length ? this._events = [
                [this.inputField, t],
                [this.component, {
                    click: e.proxy(this.show, this)
                }]
            ] : this._events = [
                [this.element, {
                    click: e.proxy(this.show, this),
                    keydown: e.proxy(this.keydown, this)
                }]
            ], this._events.push([this.element, "*", {
                blur: e.proxy((function(e) {
                    this._focused_from = e.target
                }), this)
            }], [this.element, {
                blur: e.proxy((function(e) {
                    this._focused_from = e.target
                }), this)
            }]), this.o.immediateUpdates && this._events.push([this.element, {
                "changeYear changeMonth": e.proxy((function(e) {
                    this.update(e.date)
                }), this)
            }]), this._secondaryEvents = [
                [this.picker, {
                    click: e.proxy(this.click, this)
                }],
                [this.picker, ".prev, .next", {
                    click: e.proxy(this.navArrowsClick, this)
                }],
                [this.picker, ".day:not(.disabled)", {
                    click: e.proxy(this.dayCellClick, this)
                }],
                [e(window), {
                    resize: e.proxy(this.place, this)
                }],
                [e(document), {
                    "mousedown touchstart": e.proxy((function(e) {
                        this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline || this.hide()
                    }), this)
                }]
            ]
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(t, a) {
            var n = a || this.dates.get(-1),
                i = this._utc_to_local(n);
            this.element.trigger({
                type: t,
                date: i,
                viewMode: this.viewMode,
                dates: e.map(this.dates, this._utc_to_local),
                format: e.proxy((function(e, t) {
                    0 === arguments.length ? (e = this.dates.length - 1, t = this.o.format) : "string" == typeof e && (t = e, e = this.dates.length - 1), t = t || this.o.format;
                    var a = this.dates.get(e);
                    return m.formatDate(a, t, this.o.language)
                }), this)
            })
        },
        show: function() {
            if (!(this.inputField.prop("disabled") || this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && e(this.element).blur(), this
        },
        hide: function() {
            return this.isInline || !this.picker.is(":visible") || (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide")), this
        },
        destroy: function() {
            return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
        },
        paste: function(t) {
            var a;
            if (t.originalEvent.clipboardData && t.originalEvent.clipboardData.types && -1 !== e.inArray("text/plain", t.originalEvent.clipboardData.types)) a = t.originalEvent.clipboardData.getData("text/plain");
            else {
                if (!window.clipboardData) return;
                a = window.clipboardData.getData("Text")
            }
            this.setDate(a), this.update(), t.preventDefault()
        },
        _utc_to_local: function(e) {
            if (!e) return e;
            var t = new Date(e.getTime() + 6e4 * e.getTimezoneOffset());
            return t.getTimezoneOffset() !== e.getTimezoneOffset() && (t = new Date(e.getTime() + 6e4 * t.getTimezoneOffset())), t
        },
        _local_to_utc: function(e) {
            return e && new Date(e.getTime() - 6e4 * e.getTimezoneOffset())
        },
        _zero_time: function(e) {
            return e && new Date(e.getFullYear(), e.getMonth(), e.getDate())
        },
        _zero_utc_time: function(e) {
            return e && a(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
        },
        getDates: function() {
            return e.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return e.map(this.dates, (function(e) {
                return new Date(e)
            }))
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var e = this.dates.get(-1);
            return e !== t ? new Date(e) : null
        },
        clearDates: function() {
            this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
        },
        setDates: function() {
            var t = e.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, t), this._trigger("changeDate"), this.setValue(), this
        },
        setUTCDates: function() {
            var t = e.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.setDates.apply(this, e.map(t, this._utc_to_local)), this
        },
        setDate: r("setDates"),
        setUTCDate: r("setUTCDates"),
        remove: r("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
        setValue: function() {
            var e = this.getFormattedDate();
            return this.inputField.val(e), this
        },
        getFormattedDate: function(a) {
            a === t && (a = this.o.format);
            var n = this.o.language;
            return e.map(this.dates, (function(e) {
                return m.formatDate(e, a, n)
            })).join(this.o.multidateSeparator)
        },
        getStartDate: function() {
            return this.o.startDate
        },
        setStartDate: function(e) {
            return this._process_options({
                startDate: e
            }), this.update(), this.updateNavArrows(), this
        },
        getEndDate: function() {
            return this.o.endDate
        },
        setEndDate: function(e) {
            return this._process_options({
                endDate: e
            }), this.update(), this.updateNavArrows(), this
        },
        setDaysOfWeekDisabled: function(e) {
            return this._process_options({
                daysOfWeekDisabled: e
            }), this.update(), this
        },
        setDaysOfWeekHighlighted: function(e) {
            return this._process_options({
                daysOfWeekHighlighted: e
            }), this.update(), this
        },
        setDatesDisabled: function(e) {
            return this._process_options({
                datesDisabled: e
            }), this.update(), this
        },
        place: function() {
            if (this.isInline) return this;
            var t = this.picker.outerWidth(),
                a = this.picker.outerHeight(),
                n = 10,
                i = e(this.o.container),
                r = i.width(),
                o = "body" === this.o.container ? e(document).scrollTop() : i.scrollTop(),
                s = i.offset(),
                l = [0];
            this.element.parents().each((function() {
                var t = e(this).css("z-index");
                "auto" !== t && 0 !== Number(t) && l.push(Number(t))
            }));
            var c = Math.max.apply(Math, l) + this.o.zIndexOffset,
                d = this.component ? this.component.parent().offset() : this.element.offset(),
                _ = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                p = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                h = d.left - s.left,
                u = d.top - s.top;
            "body" !== this.o.container && (u += o), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (h -= t - p)) : d.left < 0 ? (this.picker.addClass("datepicker-orient-left"), h -= d.left - n) : h + t > r ? (this.picker.addClass("datepicker-orient-right"), h += p - t) : this.o.rtl ? this.picker.addClass("datepicker-orient-right") : this.picker.addClass("datepicker-orient-left");
            var f = this.o.orientation.y;
            if ("auto" === f && (f = -o + u - a < 0 ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + f), "top" === f ? u -= a + parseInt(this.picker.css("padding-top")) : u += _, this.o.rtl) {
                var v = r - (h + p);
                this.picker.css({
                    top: u,
                    right: v,
                    zIndex: c
                })
            } else this.picker.css({
                top: u,
                left: h,
                zIndex: c
            });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var t = this.dates.copy(),
                a = [],
                n = !1;
            return arguments.length ? (e.each(arguments, e.proxy((function(e, t) {
                    t instanceof Date && (t = this._local_to_utc(t)), a.push(t)
                }), this)), n = !0) : (a = (a = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val()) && this.o.multidate ? a.split(this.o.multidateSeparator) : [a], delete this.element.data().date), a = e.map(a, e.proxy((function(e) {
                    return m.parseDate(e, this.o.format, this.o.language, this.o.assumeNearbyYear)
                }), this)), a = e.grep(a, e.proxy((function(e) {
                    return !this.dateWithinRange(e) || !e
                }), this), !0), this.dates.replace(a), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate),
                n ? (this.setValue(), this.element.change()) : this.dates.length && String(t) !== String(this.dates) && n && (this._trigger("changeDate"), this.element.change()), !this.dates.length && t.length && (this._trigger("clearDate"), this.element.change()), this.fill(), this
        },
        fillDow: function() {
            if (this.o.showWeekDays) {
                var t = this.o.weekStart,
                    a = "<tr>";
                for (this.o.calendarWeeks && (a += '<th class="cw">&#160;</th>'); t < this.o.weekStart + 7;) a += '<th class="dow', -1 !== e.inArray(t, this.o.daysOfWeekDisabled) && (a += " disabled"), a += '">' + v[this.o.language].daysMin[t++ % 7] + "</th>";
                a += "</tr>", this.picker.find(".datepicker-days thead").append(a)
            }
        },
        fillMonths: function() {
            for (var e = this._utc_to_local(this.viewDate), t = "", a = 0; a < 12; a++) t += '<span class="month' + (e && e.getMonth() === a ? " focused" : "") + '">' + v[this.o.language].monthsShort[a] + "</span>";
            this.picker.find(".datepicker-months td").html(t)
        },
        setRange: function(t) {
            t && t.length ? this.range = e.map(t, (function(e) {
                return e.valueOf()
            })) : delete this.range, this.fill()
        },
        getClassNames: function(t) {
            var a = [],
                r = this.viewDate.getUTCFullYear(),
                o = this.viewDate.getUTCMonth(),
                s = n();
            return t.getUTCFullYear() < r || t.getUTCFullYear() === r && t.getUTCMonth() < o ? a.push("old") : (t.getUTCFullYear() > r || t.getUTCFullYear() === r && t.getUTCMonth() > o) && a.push("new"), this.focusDate && t.valueOf() === this.focusDate.valueOf() && a.push("focused"), this.o.todayHighlight && i(t, s) && a.push("today"), -1 !== this.dates.contains(t) && a.push("active"), this.dateWithinRange(t) || a.push("disabled"), this.dateIsDisabled(t) && a.push("disabled", "disabled-date"), -1 !== e.inArray(t.getUTCDay(), this.o.daysOfWeekHighlighted) && a.push("highlighted"), this.range && (t > this.range[0] && t < this.range[this.range.length - 1] && a.push("range"), -1 !== e.inArray(t.valueOf(), this.range) && a.push("selected"), t.valueOf() === this.range[0] && a.push("range-start"), t.valueOf() === this.range[this.range.length - 1] && a.push("range-end")), a
        },
        _fill_yearsView: function(a, n, i, r, o, s, l) {
            for (var c, d, _, p = "", h = i / 10, u = this.picker.find(a), f = Math.floor(r / i) * i, v = f + 9 * h, m = Math.floor(this.viewDate.getFullYear() / h) * h, g = e.map(this.dates, (function(e) {
                    return Math.floor(e.getUTCFullYear() / h) * h
                })), y = f - h; y <= v + h; y += h) c = [n], d = null, y === f - h ? c.push("old") : y === v + h && c.push("new"), -1 !== e.inArray(y, g) && c.push("active"), (y < o || y > s) && c.push("disabled"), y === m && c.push("focused"), l !== e.noop && ((_ = l(new Date(y, 0, 1))) === t ? _ = {} : "boolean" == typeof _ ? _ = {
                enabled: _
            } : "string" == typeof _ && (_ = {
                classes: _
            }), !1 === _.enabled && c.push("disabled"), _.classes && (c = c.concat(_.classes.split(/\s+/))), _.tooltip && (d = _.tooltip)), p += '<span class="' + c.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ">" + y + "</span>";
            u.find(".datepicker-switch").text(f + "-" + v), u.find("td").html(p)
        },
        fill: function() {
            var n, i, r = new Date(this.viewDate),
                o = r.getUTCFullYear(),
                s = r.getUTCMonth(),
                l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                c = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                d = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                _ = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                p = v[this.o.language].today || v.en.today || "",
                h = v[this.o.language].clear || v.en.clear || "",
                u = v[this.o.language].titleFormat || v.en.titleFormat;
            if (!isNaN(o) && !isNaN(s)) {
                this.picker.find(".datepicker-days .datepicker-switch").text(m.formatDate(r, u, this.o.language)), this.picker.find("tfoot .today").text(p).css("display", !0 === this.o.todayBtn || "linked" === this.o.todayBtn ? "table-cell" : "none"), this.picker.find("tfoot .clear").text(h).css("display", !0 === this.o.clearBtn ? "table-cell" : "none"), this.picker.find("thead .datepicker-title").text(this.o.title).css("display", "string" == typeof this.o.title && "" !== this.o.title ? "table-cell" : "none"), this.updateNavArrows(), this.fillMonths();
                var f = a(o, s, 0),
                    g = f.getUTCDate();
                f.setUTCDate(g - (f.getUTCDay() - this.o.weekStart + 7) % 7);
                var y = new Date(f);
                f.getUTCFullYear() < 100 && y.setUTCFullYear(f.getUTCFullYear()), y.setUTCDate(y.getUTCDate() + 42), y = y.valueOf();
                for (var x, b, w = []; f.valueOf() < y;) {
                    if ((x = f.getUTCDay()) === this.o.weekStart && (w.push("<tr>"), this.o.calendarWeeks)) {
                        var $ = new Date(+f + (this.o.weekStart - x - 7) % 7 * 864e5),
                            k = new Date(Number($) + (11 - $.getUTCDay()) % 7 * 864e5),
                            C = new Date(Number(C = a(k.getUTCFullYear(), 0, 1)) + (11 - C.getUTCDay()) % 7 * 864e5),
                            D = (k - C) / 864e5 / 7 + 1;
                        w.push('<td class="cw">' + D + "</td>")
                    }(b = this.getClassNames(f)).push("day");
                    var M = f.getUTCDate();
                    this.o.beforeShowDay !== e.noop && ((i = this.o.beforeShowDay(this._utc_to_local(f))) === t ? i = {} : "boolean" == typeof i ? i = {
                        enabled: i
                    } : "string" == typeof i && (i = {
                        classes: i
                    }), !1 === i.enabled && b.push("disabled"), i.classes && (b = b.concat(i.classes.split(/\s+/))), i.tooltip && (n = i.tooltip), i.content && (M = i.content)), b = e.isFunction(e.uniqueSort) ? e.uniqueSort(b) : e.unique(b), w.push('<td class="' + b.join(" ") + '"' + (n ? ' title="' + n + '"' : "") + ' data-date="' + f.getTime().toString() + '">' + M + "</td>"), n = null, x === this.o.weekEnd && w.push("</tr>"), f.setUTCDate(f.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").html(w.join(""));
                var T = v[this.o.language].monthsTitle || v.en.monthsTitle || "Months",
                    I = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? T : o).end().find("tbody span").removeClass("active");
                if (e.each(this.dates, (function(e, t) {
                        t.getUTCFullYear() === o && I.eq(t.getUTCMonth()).addClass("active")
                    })), (o < l || o > d) && I.addClass("disabled"), o === l && I.slice(0, c).addClass("disabled"), o === d && I.slice(_ + 1).addClass("disabled"), this.o.beforeShowMonth !== e.noop) {
                    var z = this;
                    e.each(I, (function(a, n) {
                        var i = new Date(o, a, 1),
                            r = z.o.beforeShowMonth(i);
                        r === t ? r = {} : "boolean" == typeof r ? r = {
                            enabled: r
                        } : "string" == typeof r && (r = {
                            classes: r
                        }), !1 !== r.enabled || e(n).hasClass("disabled") || e(n).addClass("disabled"), r.classes && e(n).addClass(r.classes), r.tooltip && e(n).prop("title", r.tooltip)
                    }))
                }
                this._fill_yearsView(".datepicker-years", "year", 10, o, l, d, this.o.beforeShowYear), this._fill_yearsView(".datepicker-decades", "decade", 100, o, l, d, this.o.beforeShowDecade), this._fill_yearsView(".datepicker-centuries", "century", 1e3, o, l, d, this.o.beforeShowCentury)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var e, t, a = new Date(this.viewDate),
                    n = a.getUTCFullYear(),
                    i = a.getUTCMonth(),
                    r = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                    o = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                    s = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                    c = 1;
                switch (this.viewMode) {
                    case 4:
                        c *= 10;
                    case 3:
                        c *= 10;
                    case 2:
                        c *= 10;
                    case 1:
                        e = Math.floor(n / c) * c < r, t = Math.floor(n / c) * c + c > s;
                        break;
                    case 0:
                        e = n <= r && i < o, t = n >= s && i > l
                }
                this.picker.find(".prev").toggleClass("disabled", e), this.picker.find(".next").toggleClass("disabled", t)
            }
        },
        click: function(t) {
            var i, r, o, s;
            t.preventDefault(), t.stopPropagation(), (i = e(t.target)).hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1), i.hasClass("today") && !i.hasClass("day") && (this.setViewMode(0), this._setDate(n(), "linked" === this.o.todayBtn ? null : "view")), i.hasClass("clear") && this.clearDates(), i.hasClass("disabled") || (i.hasClass("month") || i.hasClass("year") || i.hasClass("decade") || i.hasClass("century")) && (this.viewDate.setUTCDate(1), r = 1, 1 === this.viewMode ? (s = i.parent().find("span").index(i), o = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(s)) : (s = 0, o = Number(i.text()), this.viewDate.setUTCFullYear(o)), this._trigger(m.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(a(o, s, r)) : (this.setViewMode(this.viewMode - 1), this.fill())), this.picker.is(":visible") && this._focused_from && this._focused_from.focus(), delete this._focused_from
        },
        dayCellClick: function(t) {
            var a = e(t.currentTarget).data("date"),
                n = new Date(a);
            this.o.updateViewDate && (n.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate), n.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)), this._setDate(n)
        },
        navArrowsClick: function(t) {
            var a = e(t.currentTarget).hasClass("prev") ? -1 : 1;
            0 !== this.viewMode && (a *= 12 * m.viewModes[this.viewMode].navStep), this.viewDate = this.moveMonth(this.viewDate, a), this._trigger(m.viewModes[this.viewMode].e, this.viewDate), this.fill()
        },
        _toggle_multidate: function(e) {
            var t = this.dates.contains(e);
            if (e || this.dates.clear(), -1 !== t ? (!0 === this.o.multidate || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(t) : !1 === this.o.multidate ? (this.dates.clear(), this.dates.push(e)) : this.dates.push(e), "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
        },
        _setDate: function(e, t) {
            t && "date" !== t || this._toggle_multidate(e && new Date(e)), (!t && this.o.updateViewDate || "view" === t) && (this.viewDate = e && new Date(e)), this.fill(), this.setValue(), t && "view" === t || this._trigger("changeDate"), this.inputField.trigger("change"), !this.o.autoclose || t && "date" !== t || this.hide()
        },
        moveDay: function(e, t) {
            var a = new Date(e);
            return a.setUTCDate(e.getUTCDate() + t), a
        },
        moveWeek: function(e, t) {
            return this.moveDay(e, 7 * t)
        },
        moveMonth: function(e, t) {
            if (!o(e)) return this.o.defaultViewDate;
            if (!t) return e;
            var a, n, i = new Date(e.valueOf()),
                r = i.getUTCDate(),
                s = i.getUTCMonth(),
                l = Math.abs(t);
            if (t = t > 0 ? 1 : -1, 1 === l) n = -1 === t ? function() {
                return i.getUTCMonth() === s
            } : function() {
                return i.getUTCMonth() !== a
            }, a = s + t, i.setUTCMonth(a), a = (a + 12) % 12;
            else {
                for (var c = 0; c < l; c++) i = this.moveMonth(i, t);
                a = i.getUTCMonth(), i.setUTCDate(r), n = function() {
                    return a !== i.getUTCMonth()
                }
            }
            for (; n();) i.setUTCDate(--r), i.setUTCMonth(a);
            return i
        },
        moveYear: function(e, t) {
            return this.moveMonth(e, 12 * t)
        },
        moveAvailableDate: function(e, t, a) {
            do {
                if (e = this[a](e, t), !this.dateWithinRange(e)) return !1;
                a = "moveDay"
            } while (this.dateIsDisabled(e));
            return e
        },
        weekOfDateIsDisabled: function(t) {
            return -1 !== e.inArray(t.getUTCDay(), this.o.daysOfWeekDisabled)
        },
        dateIsDisabled: function(t) {
            return this.weekOfDateIsDisabled(t) || e.grep(this.o.datesDisabled, (function(e) {
                return i(t, e)
            })).length > 0
        },
        dateWithinRange: function(e) {
            return e >= this.o.startDate && e <= this.o.endDate
        },
        keydown: function(e) {
            if (this.picker.is(":visible")) {
                var t, a, n = !1,
                    i = this.focusDate || this.viewDate;
                switch (e.keyCode) {
                    case 27:
                        this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), e.preventDefault(), e.stopPropagation();
                        break;
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                        t = 37 === e.keyCode || 38 === e.keyCode ? -1 : 1, 0 === this.viewMode ? e.ctrlKey ? (a = this.moveAvailableDate(i, t, "moveYear")) && this._trigger("changeYear", this.viewDate) : e.shiftKey ? (a = this.moveAvailableDate(i, t, "moveMonth")) && this._trigger("changeMonth", this.viewDate) : 37 === e.keyCode || 39 === e.keyCode ? a = this.moveAvailableDate(i, t, "moveDay") : this.weekOfDateIsDisabled(i) || (a = this.moveAvailableDate(i, t, "moveWeek")) : 1 === this.viewMode ? (38 !== e.keyCode && 40 !== e.keyCode || (t *= 4), a = this.moveAvailableDate(i, t, "moveMonth")) : 2 === this.viewMode && (38 !== e.keyCode && 40 !== e.keyCode || (t *= 4), a = this.moveAvailableDate(i, t, "moveYear")), a && (this.focusDate = this.viewDate = a, this.setValue(), this.fill(), e.preventDefault());
                        break;
                    case 13:
                        if (!this.o.forceParse) break;
                        i = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(i), n = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (e.preventDefault(), e.stopPropagation(), this.o.autoclose && this.hide());
                        break;
                    case 9:
                        this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
                }
                n && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField.trigger("change"))
            } else 40 !== e.keyCode && 27 !== e.keyCode || (this.show(), e.stopPropagation())
        },
        setViewMode: function(e) {
            this.viewMode = e, this.picker.children("div").hide().filter(".datepicker-" + m.viewModes[this.viewMode].clsName).show(), this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate))
        }
    };
    var _ = function(t, a) {
        e.data(t, "datepicker", this), this.element = e(t), this.inputs = e.map(a.inputs, (function(e) {
            return e.jquery ? e[0] : e
        })), delete a.inputs, this.keepEmptyValues = a.keepEmptyValues, delete a.keepEmptyValues, h.call(e(this.inputs), a).on("changeDate", e.proxy(this.dateUpdated, this)), this.pickers = e.map(this.inputs, (function(t) {
            return e.data(t, "datepicker")
        })), this.updateDates()
    };
    _.prototype = {
        updateDates: function() {
            this.dates = e.map(this.pickers, (function(e) {
                return e.getUTCDate()
            })), this.updateRanges()
        },
        updateRanges: function() {
            var t = e.map(this.dates, (function(e) {
                return e.valueOf()
            }));
            e.each(this.pickers, (function(e, a) {
                a.setRange(t)
            }))
        },
        clearDates: function() {
            e.each(this.pickers, (function(e, t) {
                t.clearDates()
            }))
        },
        dateUpdated: function(a) {
            if (!this.updating) {
                this.updating = !0;
                var n = e.data(a.target, "datepicker");
                if (n !== t) {
                    var i = n.getUTCDate(),
                        r = this.keepEmptyValues,
                        o = e.inArray(a.target, this.inputs),
                        s = o - 1,
                        l = o + 1,
                        c = this.inputs.length;
                    if (-1 !== o) {
                        if (e.each(this.pickers, (function(e, t) {
                                t.getUTCDate() || t !== n && r || t.setUTCDate(i)
                            })), i < this.dates[s])
                            for (; s >= 0 && i < this.dates[s];) this.pickers[s--].setUTCDate(i);
                        else if (i > this.dates[l])
                            for (; l < c && i > this.dates[l];) this.pickers[l++].setUTCDate(i);
                        this.updateDates(), delete this.updating
                    }
                }
            }
        },
        destroy: function() {
            e.map(this.pickers, (function(e) {
                e.destroy()
            })), e(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker
        },
        remove: r("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")
    };
    var p = e.fn.datepicker,
        h = function(a) {
            var n, i = Array.apply(null, arguments);
            if (i.shift(), this.each((function() {
                    var t = e(this),
                        r = t.data("datepicker"),
                        o = "object" == typeof a && a;
                    if (!r) {
                        var c = s(this, "date"),
                            p = l(e.extend({}, u, c, o).language),
                            h = e.extend({}, u, p, c, o);
                        t.hasClass("input-daterange") || h.inputs ? (e.extend(h, {
                            inputs: h.inputs || t.find("input").toArray()
                        }), r = new _(this, h)) : r = new d(this, h), t.data("datepicker", r)
                    }
                    "string" == typeof a && "function" == typeof r[a] && (n = r[a].apply(r, i))
                })), n === t || n instanceof d || n instanceof _) return this;
            if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + a + " function)");
            return n
        };
    e.fn.datepicker = h;
    var u = e.fn.datepicker.defaults = {
            assumeNearbyYear: !1,
            autoclose: !1,
            beforeShowDay: e.noop,
            beforeShowMonth: e.noop,
            beforeShowYear: e.noop,
            beforeShowDecade: e.noop,
            beforeShowCentury: e.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            daysOfWeekHighlighted: [],
            datesDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keepEmptyValues: !1,
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            maxViewMode: 4,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -1 / 0,
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            updateViewDate: !0,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            showOnFocus: !0,
            zIndexOffset: 10,
            container: "body",
            immediateUpdates: !1,
            title: "",
            templates: {
                leftArrow: "&#x00AB;",
                rightArrow: "&#x00BB;"
            },
            showWeekDays: !0
        },
        f = e.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    e.fn.datepicker.Constructor = d;
    var v = e.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear",
                titleFormat: "MM yyyy"
            }
        },
        m = {
            viewModes: [{
                names: ["days", "month"],
                clsName: "days",
                e: "changeMonth"
            }, {
                names: ["months", "year"],
                clsName: "months",
                e: "changeYear",
                navStep: 1
            }, {
                names: ["years", "decade"],
                clsName: "years",
                e: "changeDecade",
                navStep: 10
            }, {
                names: ["decades", "century"],
                clsName: "decades",
                e: "changeCentury",
                navStep: 100
            }, {
                names: ["centuries", "millennium"],
                clsName: "centuries",
                e: "changeMillennium",
                navStep: 1e3
            }],
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
            parseFormat: function(e) {
                if ("function" == typeof e.toValue && "function" == typeof e.toDisplay) return e;
                var t = e.replace(this.validParts, "\0").split("\0"),
                    a = e.match(this.validParts);
                if (!t || !t.length || !a || 0 === a.length) throw new Error("Invalid date format.");
                return {
                    separators: t,
                    parts: a
                }
            },
            parseDate: function(a, i, r, o) {
                function s(e, t) {
                    return !0 === t && (t = 10), e < 100 && ((e += 2e3) > (new Date).getFullYear() + t && (e -= 100)), e
                }

                function l() {
                    var e = this.slice(0, c[h].length),
                        t = c[h].slice(0, e.length);
                    return e.toLowerCase() === t.toLowerCase()
                }
                if (!a) return t;
                if (a instanceof Date) return a;
                if ("string" == typeof i && (i = m.parseFormat(i)), i.toValue) return i.toValue(a, i, r);
                var c, _, p, h, u, f = {
                        d: "moveDay",
                        m: "moveMonth",
                        w: "moveWeek",
                        y: "moveYear"
                    },
                    g = {
                        yesterday: "-1d",
                        today: "+0d",
                        tomorrow: "+1d"
                    };
                if (a in g && (a = g[a]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(a)) {
                    for (c = a.match(/([\-+]\d+)([dmwy])/gi), a = new Date, h = 0; h < c.length; h++) _ = c[h].match(/([\-+]\d+)([dmwy])/i), p = Number(_[1]), u = f[_[2].toLowerCase()], a = d.prototype[u](a, p);
                    return d.prototype._zero_utc_time(a)
                }
                c = a && a.match(this.nonpunctuation) || [];
                var y, x, b = {},
                    w = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    $ = {
                        yyyy: function(e, t) {
                            return e.setUTCFullYear(o ? s(t, o) : t)
                        },
                        m: function(e, t) {
                            if (isNaN(e)) return e;
                            for (t -= 1; t < 0;) t += 12;
                            for (t %= 12, e.setUTCMonth(t); e.getUTCMonth() !== t;) e.setUTCDate(e.getUTCDate() - 1);
                            return e
                        },
                        d: function(e, t) {
                            return e.setUTCDate(t)
                        }
                    };
                $.yy = $.yyyy, $.M = $.MM = $.mm = $.m, $.dd = $.d, a = n();
                var k = i.parts.slice();
                if (c.length !== k.length && (k = e(k).filter((function(t, a) {
                        return -1 !== e.inArray(a, w)
                    })).toArray()), c.length === k.length) {
                    var C, D, M;
                    for (h = 0, C = k.length; h < C; h++) {
                        if (y = parseInt(c[h], 10), _ = k[h], isNaN(y)) switch (_) {
                            case "MM":
                                x = e(v[r].months).filter(l), y = e.inArray(x[0], v[r].months) + 1;
                                break;
                            case "M":
                                x = e(v[r].monthsShort).filter(l), y = e.inArray(x[0], v[r].monthsShort) + 1
                        }
                        b[_] = y
                    }
                    for (h = 0; h < w.length; h++)(M = w[h]) in b && !isNaN(b[M]) && (D = new Date(a), $[M](D, b[M]), isNaN(D) || (a = D))
                }
                return a
            },
            formatDate: function(t, a, n) {
                if (!t) return "";
                if ("string" == typeof a && (a = m.parseFormat(a)), a.toDisplay) return a.toDisplay(t, a, n);
                var i = {
                    d: t.getUTCDate(),
                    D: v[n].daysShort[t.getUTCDay()],
                    DD: v[n].days[t.getUTCDay()],
                    m: t.getUTCMonth() + 1,
                    M: v[n].monthsShort[t.getUTCMonth()],
                    MM: v[n].months[t.getUTCMonth()],
                    yy: t.getUTCFullYear().toString().substring(2),
                    yyyy: t.getUTCFullYear()
                };
                i.dd = (i.d < 10 ? "0" : "") + i.d, i.mm = (i.m < 10 ? "0" : "") + i.m, t = [];
                for (var r = e.extend([], a.separators), o = 0, s = a.parts.length; o <= s; o++) r.length && t.push(r.shift()), t.push(i[a.parts[o]]);
                return t.join("")
            },
            headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' + u.templates.leftArrow + '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' + u.templates.rightArrow + "</th></tr></thead>",
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
    m.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + m.headTemplate + "<tbody></tbody>" + m.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + "</table></div></div>", e.fn.datepicker.DPGlobal = m, e.fn.datepicker.noConflict = function() {
        return e.fn.datepicker = p, this
    }, e.fn.datepicker.version = "1.8.0", e.fn.datepicker.deprecated = function(e) {
        var t = window.console;
        t && t.warn && t.warn("DEPRECATED: " + e)
    }, e(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', (function(t) {
        var a = e(this);
        a.data("datepicker") || (t.preventDefault(), h.call(a, "show"))
    })), e((function() {
        h.call(e('[data-provide="datepicker-inline"]'))
    }))
}));
var BrowserHelper = function() {
    var e = {
        isIE: function() {
            return "IE" === (new UAParser).getResult().browser.name
        }
    };
    return e
}();
let BulkCardsImportsHelper = function() {
    function e(e) {
        let a = $("#csv_upload_instructions");
        if ("success" === e.status) {
            const n = e.data;
            csv_data = n.csv_data;
            const i = n.content;
            let r, o = t(i);
            $("#validation_results tbody").hide().html(o).fadeIn("fast"), is_csv_valid = i.length === n.valid_count, is_csv_valid ? ($("#validate_file_button").text("Next"), $("#excel_file_input").hide(), a.hide(), $("#csv_file_valid_message").show(), $(".bulk_import_progress_graphics").hide(), $(".bulk_import_progress_graphics[data-state=success]").show(), r = "", $("#record_preview").hide()) : ($("#validate_file_button").text("Try again"), $(".bulk_import_progress_graphics").hide(), $(".bulk_import_progress_graphics[data-state=error]").show(), r = '\n          <p class="text-danger text-center">\n            The data has errors, listed below. Please fix them and then upload the revised file.\n          </p>\n        ', $("#record_preview").fadeIn("fast")), a.html(r), $("#cards_to_use_count").text(n.valid_count)
        } else {
            let t = `\n        <p class="text-danger text-center">\n          ${e.data.messages.join("<br/>")}\n        </p>\n      `;
            a.html(t), $(".bulk_import_progress_graphics").hide(), $(".bulk_import_progress_graphics[data-state=error]").show(), $("#record_preview").hide()
        }
    }

    function t(e) {
        const t = 2;
        let a, n = "";
        for (a = 0; a < e.length; a += 1) {
            const i = e[a],
                r = i.original_data,
                o = i.computed_data;
            if (!o.is_valid) {
                n += `\n          <tr class="text-danger">\n            <td>${a+t}</td>\n            <td>${o.errors.join("<br/>")}</td>\n            <td>${r["Recipient Name"]}</td>\n            <td>${o.receiver_email}</td>\n            <td>${o.delivery_date}</td>\n            <td>${o.delivery_time}</td>\n            <td>${o.time_zone}</td>\n          </tr>\n        `
            }
        }
        return n
    }
    let a = {
        changeNavigationHeaderStep: function(e, t) {
            const a = "text-info";
            t.find("[data-step]").removeClass(a), t.find("[data-step=" + e + "]").addClass(a)
        },
        submitFileValidation: function() {
            $.blockUI(blockUILoadingConfig);
            let t = new FormData;
            const a = $("#excel_file_input")[0].files[0];
            void 0 !== a && (t.append("userfile", a), $.ajax({
                url: "/bulk_cards_imports/validate_file",
                type: "post",
                data: t,
                contentType: !1,
                processData: !1
            }).done((function(t) {
                e(t)
            })).fail((function() {
                const e = '\n            <p class="text-danger text-center">\n              An unexpected error has occurred. Please try again. If the issue persist, please contact support\n            </p>\n          ';
                $("#validation_message").html(e), $("#record_preview").hide()
            })).always((function() {
                $.unblockUI()
            })))
        }
    };
    return a
}();
var CardCoverFilterHelper = function() {
        var e = {
            scrollToTop: function(e = function() {}) {
                $("html, body").animate({
                    scrollTop: 0
                }, 500, e)
            },
            showSelectedCategoryTagFilterButtons: function() {
                let t = e.getSelectedCardCoverFilters(),
                    a = $(".clear_all_filters_btn");
                t.length > 0 ? a.show() : a.hide();
                let n = $("#card_cover_filter_buttons_container");
                n.html(""), t.forEach((function(e) {
                    let t = e[0].toString().toLowerCase(),
                        a = e[1].toString().toLowerCase();
                    $("<button/>").addClass("btn btn-sm btn-icon btn-warning m-1 py-1 px-2 card_cover_filter_button").data("tag_key", t.split(" ").join("-")).data("tag_value", a.split(" ").join("-")).html('<span class="btn-inner--text">' + a + '</span><span class="btn-inner--icon"><i class="fas fa-times"></i></span>').appendTo(n)
                }))
            },
            getSelectedCardCoverFilters: function() {
                return $("#card_cover_tag_accordion_container .cover_filter_value:checked").map((function() {
                    return [
                        [$(this).data("tag_key"), $(this).data("tag_value")]
                    ]
                })).get()
            },
            getSelectedCardCoverFiltersAsHash: function() {
                let t = e.getSelectedCardCoverFilters().sort(),
                    a = {};
                return t.forEach((function(e) {
                    e[0] in a || (a[e[0]] = []), a[e[0]].push(e[1])
                })), a
            },
            checkForFilteredCategoryTags: function(e, t) {
                let a = !0;
                return Object.keys(e).forEach((function(n) {
                    let i = t[n] || [];
                    0 === e[n].filter((e => i.includes(e.toString()))).length && (a = !1)
                })), a
            },
            paginateCardCovers: function(e, t, a) {
                let n = e.length,
                    i = $(".page_selected_text"),
                    r = $("#cover_page_navigation");
                if (r.hide(), n > t) {
                    let o = $(".page_select");
                    o.empty();
                    let s = Math.ceil(n / t);
                    for (let e = 1; e <= s; e++) $("<option>").attr("value", e).text("Page " + e + " of " + s).appendTo(o);
                    o.val(a);
                    let l = (a - 1) * t,
                        c = $(".previous_page");
                    0 === l ? c.attr("disabled", !0) : c.removeAttr("disabled");
                    let d = a * t,
                        _ = $(".next_page");
                    d > n ? (d = n, _.attr("disabled", !0)) : _.removeAttr("disabled");
                    let p = e.slice(l, d);
                    return p.show(), i.html(l + 1 + " - " + d + " of " + n), r.show(), p
                } {
                    e.show();
                    let t = 1;
                    0 === n && (t = 0), i.html(t + " - " + n + " of " + n)
                }
                return e
            },
            sortCategoryTagFilters: function() {
                $(".card_cover_tag_accordion").each((function() {
                    const e = $(this).find(".cover_filter_value_div").get();
                    e.sort((function(e, t) {
                        let a = StringHelper.parametizeString($(e).find(".cover_filter_value").data("tag_value").toString()),
                            n = StringHelper.parametizeString($(t).find(".cover_filter_value").data("tag_value").toString());
                        const i = !isNaN(parseInt(a, 10)),
                            r = !isNaN(parseInt(n, 10));
                        return i || r ? !i && r ? -1 : i && !r ? 1 : parseInt(a, 10) - parseInt(n, 10) : a.localeCompare(n)
                    })), $(this).find(".card-body").empty().append(e)
                }))
            },
            sortCardCoverTagAccordions: function(e, t) {
                if (void 0 !== t) {
                    const a = [];
                    e.find(".card_cover_tag_accordion").each((function() {
                        const e = $(this).data("tag_key");
                        t.includes(e) || a.push(e)
                    })), t.forEach((function(t) {
                        e.find(`.card_cover_tag_accordion[data-tag_key="${t}"]`).appendTo(e)
                    })), a.forEach((function(t) {
                        e.find(`.card_cover_tag_accordion[data-tag_key="${t}"]`).appendTo(e)
                    }))
                }
            }
        };
        return e
    }(),
    confettiOptions = function() {
        var e = {
            realistic_look: function(e) {
                function t(e, t) {
                    confetti(Object.assign({}, o, t, {
                        particleCount: Math.floor(a * e)
                    }))
                }
                var a = 300,
                    n = .5,
                    i = .7,
                    r = 375;
                screen.width <= r && (n = .75);
                var o = {
                    colors: e,
                    origin: {
                        x: n,
                        y: i
                    }
                };
                t(.25, {
                    spread: 26,
                    startVelocity: 55
                }), t(.2, {
                    spread: 60
                }), t(.35, {
                    spread: 100,
                    decay: .91,
                    scalar: .8
                }), t(.1, {
                    spread: 120,
                    startVelocity: 25,
                    decay: .92,
                    scalar: 1.2
                }), t(.1, {
                    spread: 120,
                    startVelocity: 45
                })
            },
            snow: function(e) {
                var t = 1500,
                    a = Date.now() + t,
                    n = 5;
                ! function i() {
                    var r, o = a - Date.now();
                    Math.max(200, o / t * 500);
                    for (n = Math.max(.8, n - .001), r = 0; r < e.length; r += 1) confetti({
                        particleCount: 1,
                        startVelocity: 0,
                        gravity: 3,
                        origin: {
                            x: Math.random(),
                            y: Math.random() * n - n
                        },
                        scalar: 2,
                        colors: [e[r]]
                    });
                    o > 0 && requestAnimationFrame(i)
                }()
            }
        };
        return e
    }(),
    CSVHelper = function() {
        const e = {
            downloadCSV: function(e, t) {
                let a = "data:text/csv;charset=utf-8," + t.map((e => e.join(","))).join("\n");
                var n = encodeURI(a),
                    i = document.createElement("a");
                i.setAttribute("href", n), i.setAttribute("download", "groupgreeting_" + e + ".csv"), document.body.appendChild(i), i.click()
            }
        };
        return e
    }();
const DateTimeHelper = function() {
    const e = {
        isDatetimeBeforeNowPlusInterval: function(e, t, a) {
            const n = new Date(Date.parse(e + " " + t)),
                i = new Date,
                r = new Date;
            return r.setHours(i.getHours() + a), n <= r
        }
    };
    return e
}();
"undefined" != typeof jQuery && function(e) {
    "use strict";

    function t(t, i, r) {
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
        for (var o = 0; o < a[t].length; o++) {
            var s = a[t][o],
                l = e("<span></span>").data("value", s.value).html(s.value);
            l.click((function(t) {
                t.preventDefault(), n.onSelect({
                    name: e(this).attr("title"),
                    value: e(this).data("value")
                }), n.closeOnSelect && r.hide()
            })), i.append(l)
        }
    }
    var a = {
            people: [{
                name: "smile",
                value: "&#x1f604"
            }, {
                name: "smiley",
                value: "&#x1f603"
            }, {
                name: "grinning",
                value: "&#x1f600"
            }, {
                name: "blush",
                value: "&#x1f60a"
            }, {
                name: "wink",
                value: "&#x1f609"
            }, {
                name: "heart-eyes",
                value: "&#x1f60d"
            }, {
                name: "kissing-heart",
                value: "&#x1f618"
            }, {
                name: "kissing-closed-eyes",
                value: "&#x1f61a"
            }, {
                name: "kissing",
                value: "&#x1f617"
            }, {
                name: "kissing-smiling-eyes",
                value: "&#x1f619"
            }, {
                name: "stuck-out-tongue-winking-eye",
                value: "&#x1f61c"
            }, {
                name: "stuck-out-tongue-closed-eyes",
                value: "&#x1f61d"
            }, {
                name: "stuck-out-tongue",
                value: "&#x1f61b"
            }, {
                name: "partying-face",
                value: "&#x1f973"
            }, {
                name: "flushed",
                value: "&#x1f633"
            }, {
                name: "grin",
                value: "&#x1f601"
            }, {
                name: "pensive",
                value: "&#x1f614"
            }, {
                name: "satisfied",
                value: "&#x1f60c"
            }, {
                name: "unamused",
                value: "&#x1f612"
            }, {
                name: "disappointed",
                value: "&#x1f61e"
            }, {
                name: "persevere",
                value: "&#x1f623"
            }, {
                name: "cry",
                value: "&#x1f622"
            }, {
                name: "joy",
                value: "&#x1f602"
            }, {
                name: "sob",
                value: "&#x1f62d"
            }, {
                name: "sleepy",
                value: "&#x1f62a"
            }, {
                name: "relieved",
                value: "&#x1f625"
            }, {
                name: "cold-sweat",
                value: "&#x1f630"
            }, {
                name: "sweat-smile",
                value: "&#x1f605"
            }, {
                name: "sweat",
                value: "&#x1f613"
            }, {
                name: "weary",
                value: "&#x1f629"
            }, {
                name: "tired-face",
                value: "&#x1f62b"
            }, {
                name: "fearful",
                value: "&#x1f628"
            }, {
                name: "scream",
                value: "&#x1f631"
            }, {
                name: "angry",
                value: "&#x1f620"
            }, {
                name: "rage",
                value: "&#x1f621"
            }, {
                name: "triumph",
                value: "&#x1f624"
            }, {
                name: "confounded",
                value: "&#x1f616"
            }, {
                name: "laughing",
                value: "&#x1f606"
            }, {
                name: "yum",
                value: "&#x1f60b"
            }, {
                name: "mask",
                value: "&#x1f637"
            }, {
                name: "sunglasses",
                value: "&#x1f60e"
            }, {
                name: "sleeping",
                value: "&#x1f634"
            }, {
                name: "dizzy-face",
                value: "&#x1f635"
            }, {
                name: "astonished",
                value: "&#x1f632"
            }, {
                name: "worried",
                value: "&#x1f61f"
            }, {
                name: "frowning",
                value: "&#x1f626"
            }, {
                name: "anguished",
                value: "&#x1f627"
            }, {
                name: "smiling-imp",
                value: "&#x1f608"
            }, {
                name: "imp",
                value: "&#x1f47f"
            }, {
                name: "open-mouth",
                value: "&#x1f62e"
            }, {
                name: "grimacing",
                value: "&#x1f62c"
            }, {
                name: "neutral-face",
                value: "&#x1f610"
            }, {
                name: "confused",
                value: "&#x1f615"
            }, {
                name: "hushed",
                value: "&#x1f62f"
            }, {
                name: "no-mouth",
                value: "&#x1f636"
            }, {
                name: "innocent",
                value: "&#x1f607"
            }, {
                name: "smirk",
                value: "&#x1f60f"
            }, {
                name: "expressionless",
                value: "&#x1f611"
            }, {
                name: "man-with-gua-pi-mao",
                value: "&#x1f472"
            }, {
                name: "man-with-turban",
                value: "&#x1f473"
            }, {
                name: "cop",
                value: "&#x1f46e"
            }, {
                name: "construction-worker",
                value: "&#x1f477"
            }, {
                name: "guardsman",
                value: "&#x1f482"
            }, {
                name: "baby",
                value: "&#x1f476"
            }, {
                name: "boy",
                value: "&#x1f466"
            }, {
                name: "girl",
                value: "&#x1f467"
            }, {
                name: "man",
                value: "&#x1f468"
            }, {
                name: "woman",
                value: "&#x1f469"
            }, {
                name: "older-man",
                value: "&#x1f474"
            }, {
                name: "older-woman",
                value: "&#x1f475"
            }, {
                name: "person-with-blond-hair",
                value: "&#x1f471"
            }, {
                name: "angel",
                value: "&#x1f47c"
            }, {
                name: "princess",
                value: "&#x1f478"
            }, {
                name: "smiley-cat",
                value: "&#x1f63a"
            }, {
                name: "smile-cat",
                value: "&#x1f638"
            }, {
                name: "heart-eyes-cat",
                value: "&#x1f63b"
            }, {
                name: "kissing-cat",
                value: "&#x1f63d"
            }, {
                name: "smirk-cat",
                value: "&#x1f63c"
            }, {
                name: "scream-cat",
                value: "&#x1f640"
            }, {
                name: "crying-cat-face",
                value: "&#x1f63f"
            }, {
                name: "joy-cat",
                value: "&#x1f639"
            }, {
                name: "pouting-cat",
                value: "&#x1f63e"
            }, {
                name: "japanese-ogre",
                value: "&#x1f479"
            }, {
                name: "japanese-goblin",
                value: "&#x1f47a"
            }, {
                name: "see-no-evil",
                value: "&#x1f648"
            }, {
                name: "hear-no-evil",
                value: "&#x1f649"
            }, {
                name: "speak-no-evil",
                value: "&#x1f64a"
            }, {
                name: "skull",
                value: "&#x1f480"
            }, {
                name: "alien",
                value: "&#x1f47d"
            }, {
                name: "poop",
                value: "&#x1f4a9"
            }, {
                name: "fire",
                value: "&#x1f525"
            }, {
                name: "sparkles",
                value: "&#x2728"
            }, {
                name: "star2",
                value: "&#x1f31f"
            }, {
                name: "dizzy",
                value: "&#x1f4ab"
            }, {
                name: "boom",
                value: "&#x1f4a5"
            }, {
                name: "anger",
                value: "&#x1f4a2"
            }, {
                name: "sweat-drops",
                value: "&#x1f4a6"
            }, {
                name: "droplet",
                value: "&#x1f4a7"
            }, {
                name: "zzz",
                value: "&#x1f4a4"
            }, {
                name: "dash",
                value: "&#x1f4a8"
            }, {
                name: "ear",
                value: "&#x1f442"
            }, {
                name: "eyes",
                value: "&#x1f440"
            }, {
                name: "nose",
                value: "&#x1f443"
            }, {
                name: "tongue",
                value: "&#x1f445"
            }, {
                name: "lips",
                value: "&#x1f444"
            }, {
                name: "thumbsup",
                value: "&#x1f44d"
            }, {
                name: "thumbsdown",
                value: "&#x1f44e"
            }, {
                name: "ok-hand",
                value: "&#x1f44c"
            }, {
                name: "punch",
                value: "&#x1f44a"
            }, {
                name: "fist",
                value: "&#x270a"
            }, {
                name: "v",
                value: "&#x270c"
            }, {
                name: "wave",
                value: "&#x1f44b"
            }, {
                name: "hand",
                value: "&#x270b"
            }, {
                name: "open-hands",
                value: "&#x1f450"
            }, {
                name: "point-up-2",
                value: "&#x1f446"
            }, {
                name: "point-down",
                value: "&#x1f447"
            }, {
                name: "point-right",
                value: "&#x1f449"
            }, {
                name: "point-left",
                value: "&#x1f448"
            }, {
                name: "raised-hands",
                value: "&#x1f64c"
            }, {
                name: "pray",
                value: "&#x1f64f"
            }, {
                name: "point-up",
                value: "&#x261d"
            }, {
                name: "clap",
                value: "&#x1f44f"
            }, {
                name: "muscle",
                value: "&#x1f4aa"
            }, {
                name: "walking",
                value: "&#x1f6b6"
            }, {
                name: "runner",
                value: "&#x1f3c3"
            }, {
                name: "dancer",
                value: "&#x1f483"
            }, {
                name: "couple",
                value: "&#x1f46b"
            }, {
                name: "family",
                value: "&#x1f46a"
            }, {
                name: "two-men-holding-hands",
                value: "&#x1f46c"
            }, {
                name: "two-women-holding-hands",
                value: "&#x1f46d"
            }, {
                name: "couplekiss",
                value: "&#x1f48f"
            }, {
                name: "couple-with-heart",
                value: "&#x1f491"
            }, {
                name: "dancers",
                value: "&#x1f46f"
            }, {
                name: "ok-woman",
                value: "&#x1f646"
            }, {
                name: "no-good",
                value: "&#x1f645"
            }, {
                name: "information-desk-person",
                value: "&#x1f481"
            }, {
                name: "raised-hand",
                value: "&#x1f64b"
            }, {
                name: "massage",
                value: "&#x1f486"
            }, {
                name: "haircut",
                value: "&#x1f487"
            }, {
                name: "nail-care",
                value: "&#x1f485"
            }, {
                name: "bride-with-veil",
                value: "&#x1f470"
            }, {
                name: "person-with-pouting-face",
                value: "&#x1f64e"
            }, {
                name: "person-frowning",
                value: "&#x1f64d"
            }, {
                name: "bow",
                value: "&#x1f647"
            }, {
                name: "tophat",
                value: "&#x1f3a9"
            }, {
                name: "crown",
                value: "&#x1f451"
            }, {
                name: "womans-hat",
                value: "&#x1f452"
            }, {
                name: "athletic-shoe",
                value: "&#x1f45f"
            }, {
                name: "mans-shoe",
                value: "&#x1f45e"
            }, {
                name: "sandal",
                value: "&#x1f461"
            }, {
                name: "high-heel",
                value: "&#x1f460"
            }, {
                name: "boot",
                value: "&#x1f462"
            }, {
                name: "shirt",
                value: "&#x1f455"
            }, {
                name: "necktie",
                value: "&#x1f454"
            }, {
                name: "womans-clothes",
                value: "&#x1f45a"
            }, {
                name: "dress",
                value: "&#x1f457"
            }, {
                name: "running-shirt-with-sash",
                value: "&#x1f3bd"
            }, {
                name: "jeans",
                value: "&#x1f456"
            }, {
                name: "kimono",
                value: "&#x1f458"
            }, {
                name: "bikini",
                value: "&#x1f459"
            }, {
                name: "briefcase",
                value: "&#x1f4bc"
            }, {
                name: "handbag",
                value: "&#x1f45c"
            }, {
                name: "pouch",
                value: "&#x1f45d"
            }, {
                name: "purse",
                value: "&#x1f45b"
            }, {
                name: "eyeglasses",
                value: "&#x1f453"
            }, {
                name: "ribbon",
                value: "&#x1f380"
            }, {
                name: "closed-umbrella",
                value: "&#x1f302"
            }, {
                name: "lipstick",
                value: "&#x1f484"
            }, {
                name: "yellow-heart",
                value: "&#x1f49b"
            }, {
                name: "blue-heart",
                value: "&#x1f499"
            }, {
                name: "purple-heart",
                value: "&#x1f49c"
            }, {
                name: "green-heart",
                value: "&#x1f49a"
            }, {
                name: "heart",
                value: "&#x2764"
            }, {
                name: "broken-heart",
                value: "&#x1f494"
            }, {
                name: "heartpulse",
                value: "&#x1f497"
            }, {
                name: "heartbeat",
                value: "&#x1f493"
            }, {
                name: "two-hearts",
                value: "&#x1f495"
            }, {
                name: "sparkling-heart",
                value: "&#x1f496"
            }, {
                name: "revolving-hearts",
                value: "&#x1f49e"
            }, {
                name: "love-letter",
                value: "&#x1f48c"
            }, {
                name: "cupid",
                value: "&#x1f498"
            }, {
                name: "kiss",
                value: "&#x1f48b"
            }, {
                name: "ring",
                value: "&#x1f48d"
            }, {
                name: "gem",
                value: "&#x1f48e"
            }, {
                name: "bust-in-silhouette",
                value: "&#x1f464"
            }, {
                name: "busts-in-silhouette",
                value: "&#x1f465"
            }, {
                name: "speech-balloon",
                value: "&#x1f4ac"
            }, {
                name: "feet",
                value: "&#x1f463"
            }, {
                name: "thought-balloon",
                value: "&#x1f4ad"
            }],
            nature: [{
                name: "dog",
                value: "&#x1f436"
            }, {
                name: "wolf",
                value: "&#x1f43a"
            }, {
                name: "cat",
                value: "&#x1f431"
            }, {
                name: "mouse",
                value: "&#x1f42d"
            }, {
                name: "hamster",
                value: "&#x1f439"
            }, {
                name: "rabbit",
                value: "&#x1f430"
            }, {
                name: "frog",
                value: "&#x1f438"
            }, {
                name: "tiger",
                value: "&#x1f42f"
            }, {
                name: "koala",
                value: "&#x1f428"
            }, {
                name: "bear",
                value: "&#x1f43b"
            }, {
                name: "pig",
                value: "&#x1f437"
            }, {
                name: "pig-nose",
                value: "&#x1f43d"
            }, {
                name: "cow",
                value: "&#x1f42e"
            }, {
                name: "boar",
                value: "&#x1f417"
            }, {
                name: "monkey-face",
                value: "&#x1f435"
            }, {
                name: "monkey",
                value: "&#x1f412"
            }, {
                name: "horse",
                value: "&#x1f434"
            }, {
                name: "sheep",
                value: "&#x1f411"
            }, {
                name: "elephant",
                value: "&#x1f418"
            }, {
                name: "panda-face",
                value: "&#x1f43c"
            }, {
                name: "penguin",
                value: "&#x1f427"
            }, {
                name: "bird",
                value: "&#x1f426"
            }, {
                name: "baby-chick",
                value: "&#x1f424"
            }, {
                name: "hatched-chick",
                value: "&#x1f425"
            }, {
                name: "hatching-chick",
                value: "&#x1f423"
            }, {
                name: "chicken",
                value: "&#x1f414"
            }, {
                name: "snake",
                value: "&#x1f40d"
            }, {
                name: "turtle",
                value: "&#x1f422"
            }, {
                name: "bug",
                value: "&#x1f41b"
            }, {
                name: "honeybee",
                value: "&#x1f41d"
            }, {
                name: "ant",
                value: "&#x1f41c"
            }, {
                name: "beetle",
                value: "&#x1f41e"
            }, {
                name: "snail",
                value: "&#x1f40c"
            }, {
                name: "octopus",
                value: "&#x1f419"
            }, {
                name: "shell",
                value: "&#x1f41a"
            }, {
                name: "tropical-fish",
                value: "&#x1f420"
            }, {
                name: "fish",
                value: "&#x1f41f"
            }, {
                name: "dolphin",
                value: "&#x1f42c"
            }, {
                name: "whale",
                value: "&#x1f433"
            }, {
                name: "whale2",
                value: "&#x1f40b"
            }, {
                name: "cow2",
                value: "&#x1f404"
            }, {
                name: "ram",
                value: "&#x1f40f"
            }, {
                name: "rat",
                value: "&#x1f400"
            }, {
                name: "water-buffalo",
                value: "&#x1f403"
            }, {
                name: "tiger2",
                value: "&#x1f405"
            }, {
                name: "rabbit2",
                value: "&#x1f407"
            }, {
                name: "dragon",
                value: "&#x1f409"
            }, {
                name: "racehorse",
                value: "&#x1f40e"
            }, {
                name: "goat",
                value: "&#x1f410"
            }, {
                name: "rooster",
                value: "&#x1f413"
            }, {
                name: "dog2",
                value: "&#x1f415"
            }, {
                name: "pig2",
                value: "&#x1f416"
            }, {
                name: "mouse2",
                value: "&#x1f401"
            }, {
                name: "ox",
                value: "&#x1f402"
            }, {
                name: "dragon-face",
                value: "&#x1f432"
            }, {
                name: "blowfish",
                value: "&#x1f421"
            }, {
                name: "crocodile",
                value: "&#x1f40a"
            }, {
                name: "camel",
                value: "&#x1f42b"
            }, {
                name: "dromedary-camel",
                value: "&#x1f42a"
            }, {
                name: "leopard",
                value: "&#x1f406"
            }, {
                name: "cat2",
                value: "&#x1f408"
            }, {
                name: "poodle",
                value: "&#x1f429"
            }, {
                name: "paw-prints",
                value: "&#x1f43e"
            }, {
                name: "bouquet",
                value: "&#x1f490"
            }, {
                name: "cherry-blossom",
                value: "&#x1f338"
            }, {
                name: "tulip",
                value: "&#x1f337"
            }, {
                name: "four-leaf-clover",
                value: "&#x1f340"
            }, {
                name: "rose",
                value: "&#x1f339"
            }, {
                name: "sunflower",
                value: "&#x1f33b"
            }, {
                name: "hibiscus",
                value: "&#x1f33a"
            }, {
                name: "maple-leaf",
                value: "&#x1f341"
            }, {
                name: "leaves",
                value: "&#x1f343"
            }, {
                name: "fallen-leaf",
                value: "&#x1f342"
            }, {
                name: "herb",
                value: "&#x1f33f"
            }, {
                name: "ear-of-rice",
                value: "&#x1f33e"
            }, {
                name: "mushroom",
                value: "&#x1f344"
            }, {
                name: "cactus",
                value: "&#x1f335"
            }, {
                name: "palm-tree",
                value: "&#x1f334"
            }, {
                name: "evergreen-tree",
                value: "&#x1f332"
            }, {
                name: "deciduous-tree",
                value: "&#x1f333"
            }, {
                name: "chestnut",
                value: "&#x1f330"
            }, {
                name: "seedling",
                value: "&#x1f331"
            }, {
                name: "blossom",
                value: "&#x1f33c"
            }, {
                name: "globe-with-meridians",
                value: "&#x1f310"
            }, {
                name: "sun-with-face",
                value: "&#x1f31e"
            }, {
                name: "full-moon-with-face",
                value: "&#x1f31d"
            }, {
                name: "new-moon-with-face",
                value: "&#x1f31a"
            }, {
                name: "new-moon",
                value: "&#x1f311"
            }, {
                name: "waxing-crescent-moon",
                value: "&#x1f312"
            }, {
                name: "first-quarter-moon",
                value: "&#x1f313"
            }, {
                name: "waxing-gibbous-moon",
                value: "&#x1f314"
            }, {
                name: "full-moon",
                value: "&#x1f315"
            }, {
                name: "waning-gibbous-moon",
                value: "&#x1f316"
            }, {
                name: "last-quarter-moon",
                value: "&#x1f317"
            }, {
                name: "waning-crescent-moon",
                value: "&#x1f318"
            }, {
                name: "last-quarter-moon-with-face",
                value: "&#x1f31c"
            }, {
                name: "first-quarter-moon-with-face",
                value: "&#x1f31b"
            }, {
                name: "moon",
                value: "&#x1f319"
            }, {
                name: "earth-africa",
                value: "&#x1f30d"
            }, {
                name: "earth-americas",
                value: "&#x1f30e"
            }, {
                name: "earth-asia",
                value: "&#x1f30f"
            }, {
                name: "volcano",
                value: "&#x1f30b"
            }, {
                name: "milky-way",
                value: "&#x1f30c"
            }, {
                name: "shooting-star",
                value: "&#x1f320"
            }, {
                name: "star",
                value: "&#x2b50"
            }, {
                name: "sunny",
                value: "&#x2600"
            }, {
                name: "partly-sunny",
                value: "&#x26c5"
            }, {
                name: "cloud",
                value: "&#x2601"
            }, {
                name: "zap",
                value: "&#x26a1"
            }, {
                name: "umbrella",
                value: "&#x2614"
            }, {
                name: "snowflake",
                value: "&#x2744"
            }, {
                name: "snowman",
                value: "&#x26c4"
            }, {
                name: "cyclone",
                value: "&#x1f300"
            }, {
                name: "foggy",
                value: "&#x1f301"
            }, {
                name: "rainbow",
                value: "&#x1f308"
            }, {
                name: "ocean",
                value: "&#x1f30a"
            }],
            object: [{
                name: "bamboo",
                value: "&#x1f38d"
            }, {
                name: "gift-heart",
                value: "&#x1f49d"
            }, {
                name: "dolls",
                value: "&#x1f38e"
            }, {
                name: "school-satchel",
                value: "&#x1f392"
            }, {
                name: "mortar-board",
                value: "&#x1f393"
            }, {
                name: "flags",
                value: "&#x1f38f"
            }, {
                name: "fireworks",
                value: "&#x1f386"
            }, {
                name: "sparkler",
                value: "&#x1f387"
            }, {
                name: "wind-chime",
                value: "&#x1f390"
            }, {
                name: "rice-scene",
                value: "&#x1f391"
            }, {
                name: "jack-o-lantern",
                value: "&#x1f383"
            }, {
                name: "ghost",
                value: "&#x1f47b"
            }, {
                name: "santa",
                value: "&#x1f385"
            }, {
                name: "christmas-tree",
                value: "&#x1f384"
            }, {
                name: "gift",
                value: "&#x1f381"
            }, {
                name: "tanabata-tree",
                value: "&#x1f38b"
            }, {
                name: "tada",
                value: "&#x1f389"
            }, {
                name: "confetti-ball",
                value: "&#x1f38a"
            }, {
                name: "balloon",
                value: "&#x1f388"
            }, {
                name: "crossed-flags",
                value: "&#x1f38c"
            }, {
                name: "crystal-ball",
                value: "&#x1f52e"
            }, {
                name: "movie-camera",
                value: "&#x1f3a5"
            }, {
                name: "camera",
                value: "&#x1f4f7"
            }, {
                name: "video-camera",
                value: "&#x1f4f9"
            }, {
                name: "vhs",
                value: "&#x1f4fc"
            }, {
                name: "cd",
                value: "&#x1f4bf"
            }, {
                name: "dvd",
                value: "&#x1f4c0"
            }, {
                name: "minidisc",
                value: "&#x1f4bd"
            }, {
                name: "floppy-disk",
                value: "&#x1f4be"
            }, {
                name: "computer",
                value: "&#x1f4bb"
            }, {
                name: "iphone",
                value: "&#x1f4f1"
            }, {
                name: "phone",
                value: "&#x260e"
            }, {
                name: "telephone-receiver",
                value: "&#x1f4de"
            }, {
                name: "pager",
                value: "&#x1f4df"
            }, {
                name: "fax",
                value: "&#x1f4e0"
            }, {
                name: "satellite",
                value: "&#x1f4e1"
            }, {
                name: "tv",
                value: "&#x1f4fa"
            }, {
                name: "radio",
                value: "&#x1f4fb"
            }, {
                name: "speaker-waves",
                value: "&#x1f50a"
            }, {
                name: "sound",
                value: "&#x1f509"
            }, {
                name: "speaker",
                value: "&#x1f508"
            }, {
                name: "mute",
                value: "&#x1f507"
            }, {
                name: "bell",
                value: "&#x1f514"
            }, {
                name: "no-bell",
                value: "&#x1f515"
            }, {
                name: "loudspeaker",
                value: "&#x1f4e2"
            }, {
                name: "mega",
                value: "&#x1f4e3"
            }, {
                name: "hourglass-flowing-sand",
                value: "&#x23f3"
            }, {
                name: "hourglass",
                value: "&#x231b"
            }, {
                name: "alarm-clock",
                value: "&#x23f0"
            }, {
                name: "watch",
                value: "&#x231a"
            }, {
                name: "unlock",
                value: "&#x1f513"
            }, {
                name: "lock",
                value: "&#x1f512"
            }, {
                name: "lock-with-ink-pen",
                value: "&#x1f50f"
            }, {
                name: "closed-lock-with-key",
                value: "&#x1f510"
            }, {
                name: "key",
                value: "&#x1f511"
            }, {
                name: "mag-right",
                value: "&#x1f50e"
            }, {
                name: "bulb",
                value: "&#x1f4a1"
            }, {
                name: "flashlight",
                value: "&#x1f526"
            }, {
                name: "high-brightness",
                value: "&#x1f506"
            }, {
                name: "low-brightness",
                value: "&#x1f505"
            }, {
                name: "electric-plug",
                value: "&#x1f50c"
            }, {
                name: "battery",
                value: "&#x1f50b"
            }, {
                name: "mag",
                value: "&#x1f50d"
            }, {
                name: "bathtub",
                value: "&#x1f6c1"
            }, {
                name: "bath",
                value: "&#x1f6c0"
            }, {
                name: "shower",
                value: "&#x1f6bf"
            }, {
                name: "toilet",
                value: "&#x1f6bd"
            }, {
                name: "wrench",
                value: "&#x1f527"
            }, {
                name: "nut-and-bolt",
                value: "&#x1f529"
            }, {
                name: "hammer",
                value: "&#x1f528"
            }, {
                name: "door",
                value: "&#x1f6aa"
            }, {
                name: "smoking",
                value: "&#x1f6ac"
            }, {
                name: "bomb",
                value: "&#x1f4a3"
            }, {
                name: "gun",
                value: "&#x1f52b"
            }, {
                name: "hocho",
                value: "&#x1f52a"
            }, {
                name: "pill",
                value: "&#x1f48a"
            }, {
                name: "syringe",
                value: "&#x1f489"
            }, {
                name: "moneybag",
                value: "&#x1f4b0"
            }, {
                name: "yen",
                value: "&#x1f4b4"
            }, {
                name: "dollar",
                value: "&#x1f4b5"
            }, {
                name: "pound",
                value: "&#x1f4b7"
            }, {
                name: "euro",
                value: "&#x1f4b6"
            }, {
                name: "credit-card",
                value: "&#x1f4b3"
            }, {
                name: "money-with-wings",
                value: "&#x1f4b8"
            }, {
                name: "calling",
                value: "&#x1f4f2"
            }, {
                name: "e-mail",
                value: "&#x1f4e7"
            }, {
                name: "inbox-tray",
                value: "&#x1f4e5"
            }, {
                name: "outbox-tray",
                value: "&#x1f4e4"
            }, {
                name: "email",
                value: "&#x2709"
            }, {
                name: "enveloppe",
                value: "&#x1f4e9"
            }, {
                name: "incoming-envelope",
                value: "&#x1f4e8"
            }, {
                name: "postal-horn",
                value: "&#x1f4ef"
            }, {
                name: "mailbox",
                value: "&#x1f4eb"
            }, {
                name: "mailbox-closed",
                value: "&#x1f4ea"
            }, {
                name: "mailbox-with-mail",
                value: "&#x1f4ec"
            }, {
                name: "mailbox-with-no-mail",
                value: "&#x1f4ed"
            }, {
                name: "postbox",
                value: "&#x1f4ee"
            }, {
                name: "package",
                value: "&#x1f4e6"
            }, {
                name: "memo",
                value: "&#x1f4dd"
            }, {
                name: "page-facing-up",
                value: "&#x1f4c4"
            }, {
                name: "page-with-curl",
                value: "&#x1f4c3"
            }, {
                name: "bookmark-tabs",
                value: "&#x1f4d1"
            }, {
                name: "bar-chart",
                value: "&#x1f4ca"
            }, {
                name: "chart-with-upwards-trend",
                value: "&#x1f4c8"
            }, {
                name: "chart-with-downwards-trend",
                value: "&#x1f4c9"
            }, {
                name: "scroll",
                value: "&#x1f4dc"
            }, {
                name: "clipboard",
                value: "&#x1f4cb"
            }, {
                name: "date",
                value: "&#x1f4c5"
            }, {
                name: "calendar",
                value: "&#x1f4c6"
            }, {
                name: "card-index",
                value: "&#x1f4c7"
            }, {
                name: "file-folder",
                value: "&#x1f4c1"
            }, {
                name: "open-file-folder",
                value: "&#x1f4c2"
            }, {
                name: "scissors",
                value: "&#x2702"
            }, {
                name: "pushpin",
                value: "&#x1f4cc"
            }, {
                name: "paperclip",
                value: "&#x1f4ce"
            }, {
                name: "black-nib",
                value: "&#x2712"
            }, {
                name: "pencil2",
                value: "&#x270f"
            }, {
                name: "straight-ruler",
                value: "&#x1f4cf"
            }, {
                name: "triangular-ruler",
                value: "&#x1f4d0"
            }, {
                name: "closed-book",
                value: "&#x1f4d5"
            }, {
                name: "green-book",
                value: "&#x1f4d7"
            }, {
                name: "blue-book",
                value: "&#x1f4d8"
            }, {
                name: "orange-book",
                value: "&#x1f4d9"
            }, {
                name: "notebook",
                value: "&#x1f4d3"
            }, {
                name: "notebook-with-decorative-cover",
                value: "&#x1f4d4"
            }, {
                name: "ledger",
                value: "&#x1f4d2"
            }, {
                name: "books",
                value: "&#x1f4da"
            }, {
                name: "open-book",
                value: "&#x1f4d6"
            }, {
                name: "bookmark",
                value: "&#x1f516"
            }, {
                name: "name-badge",
                value: "&#x1f4db"
            }, {
                name: "microscope",
                value: "&#x1f52c"
            }, {
                name: "telescope",
                value: "&#x1f52d"
            }, {
                name: "newspaper",
                value: "&#x1f4f0"
            }, {
                name: "art",
                value: "&#x1f3a8"
            }, {
                name: "clapper",
                value: "&#x1f3ac"
            }, {
                name: "microphone",
                value: "&#x1f3a4"
            }, {
                name: "headphones",
                value: "&#x1f3a7"
            }, {
                name: "musical-score",
                value: "&#x1f3bc"
            }, {
                name: "musical-note",
                value: "&#x1f3b5"
            }, {
                name: "notes",
                value: "&#x1f3b6"
            }, {
                name: "musical-keyboard",
                value: "&#x1f3b9"
            }, {
                name: "violin",
                value: "&#x1f3bb"
            }, {
                name: "trumpet",
                value: "&#x1f3ba"
            }, {
                name: "saxophone",
                value: "&#x1f3b7"
            }, {
                name: "guitar",
                value: "&#x1f3b8"
            }, {
                name: "space-invader",
                value: "&#x1f47e"
            }, {
                name: "video-game",
                value: "&#x1f3ae"
            }, {
                name: "black-joker",
                value: "&#x1f0cf"
            }, {
                name: "flower-playing-cards",
                value: "&#x1f3b4"
            }, {
                name: "mahjong",
                value: "&#x1f004"
            }, {
                name: "game-die",
                value: "&#x1f3b2"
            }, {
                name: "dart",
                value: "&#x1f3af"
            }, {
                name: "football",
                value: "&#x1f3c8"
            }, {
                name: "basketball",
                value: "&#x1f3c0"
            }, {
                name: "soccer",
                value: "&#x26bd"
            }, {
                name: "baseball",
                value: "&#x26be"
            }, {
                name: "tennis",
                value: "&#x1f3be"
            }, {
                name: "8ball",
                value: "&#x1f3b1"
            }, {
                name: "rugby-football",
                value: "&#x1f3c9"
            }, {
                name: "bowling",
                value: "&#x1f3b3"
            }, {
                name: "golf",
                value: "&#x26f3"
            }, {
                name: "mountain-bicyclist",
                value: "&#x1f6b5"
            }, {
                name: "bicyclist",
                value: "&#x1f6b4"
            }, {
                name: "checkered-flag",
                value: "&#x1f3c1"
            }, {
                name: "horse-racing",
                value: "&#x1f3c7"
            }, {
                name: "trophy",
                value: "&#x1f3c6"
            }, {
                name: "ski",
                value: "&#x1f3bf"
            }, {
                name: "snowboarder",
                value: "&#x1f3c2"
            }, {
                name: "swimmer",
                value: "&#x1f3ca"
            }, {
                name: "surfer",
                value: "&#x1f3c4"
            }, {
                name: "fishing-pole-and-fish",
                value: "&#x1f3a3"
            }, {
                name: "coffee",
                value: "&#x2615"
            }, {
                name: "tea",
                value: "&#x1f375"
            }, {
                name: "sake",
                value: "&#x1f376"
            }, {
                name: "baby-bottle",
                value: "&#x1f37c"
            }, {
                name: "beer",
                value: "&#x1f37a"
            }, {
                name: "beers",
                value: "&#x1f37b"
            }, {
                name: "cocktail",
                value: "&#x1f378"
            }, {
                name: "tropical-drink",
                value: "&#x1f379"
            }, {
                name: "wine-glass",
                value: "&#x1f377"
            }, {
                name: "fork-and-knife",
                value: "&#x1f374"
            }, {
                name: "pizza",
                value: "&#x1f355"
            }, {
                name: "hamburger",
                value: "&#x1f354"
            }, {
                name: "fries",
                value: "&#x1f35f"
            }, {
                name: "poultry-leg",
                value: "&#x1f357"
            }, {
                name: "meat-on-bone",
                value: "&#x1f356"
            }, {
                name: "spaghetti",
                value: "&#x1f35d"
            }, {
                name: "curry",
                value: "&#x1f35b"
            }, {
                name: "fried-shrimp",
                value: "&#x1f364"
            }, {
                name: "bento",
                value: "&#x1f371"
            }, {
                name: "sushi",
                value: "&#x1f363"
            }, {
                name: "fish-cake",
                value: "&#x1f365"
            }, {
                name: "rice-ball",
                value: "&#x1f359"
            }, {
                name: "rice-cracker",
                value: "&#x1f358"
            }, {
                name: "rice",
                value: "&#x1f35a"
            }, {
                name: "ramen",
                value: "&#x1f35c"
            }, {
                name: "stew",
                value: "&#x1f372"
            }, {
                name: "oden",
                value: "&#x1f362"
            }, {
                name: "dango",
                value: "&#x1f361"
            }, {
                name: "egg",
                value: "&#x1f373"
            }, {
                name: "bread",
                value: "&#x1f35e"
            }, {
                name: "doughnut",
                value: "&#x1f369"
            }, {
                name: "custard",
                value: "&#x1f36e"
            }, {
                name: "icecream",
                value: "&#x1f366"
            }, {
                name: "ice-cream",
                value: "&#x1f368"
            }, {
                name: "shaved-ice",
                value: "&#x1f367"
            }, {
                name: "birthday",
                value: "&#x1f382"
            }, {
                name: "cake",
                value: "&#x1f370"
            }, {
                name: "cookie",
                value: "&#x1f36a"
            }, {
                name: "chocolate-bar",
                value: "&#x1f36b"
            }, {
                name: "candy",
                value: "&#x1f36c"
            }, {
                name: "lollipop",
                value: "&#x1f36d"
            }, {
                name: "honey-pot",
                value: "&#x1f36f"
            }, {
                name: "apple",
                value: "&#x1f34e"
            }, {
                name: "green-apple",
                value: "&#x1f34f"
            }, {
                name: "tangerine",
                value: "&#x1f34a"
            }, {
                name: "lemon",
                value: "&#x1f34b"
            }, {
                name: "cherries",
                value: "&#x1f352"
            }, {
                name: "grapes",
                value: "&#x1f347"
            }, {
                name: "watermelon",
                value: "&#x1f349"
            }, {
                name: "strawberry",
                value: "&#x1f353"
            }, {
                name: "peach",
                value: "&#x1f351"
            }, {
                name: "melon",
                value: "&#x1f348"
            }, {
                name: "banana",
                value: "&#x1f34c"
            }, {
                name: "pear",
                value: "&#x1f350"
            }, {
                name: "pineapple",
                value: "&#x1f34d"
            }, {
                name: "sweet-potato",
                value: "&#x1f360"
            }, {
                name: "eggplant",
                value: "&#x1f346"
            }, {
                name: "tomato",
                value: "&#x1f345"
            }, {
                name: "corn",
                value: "&#x1f33d"
            }],
            place: [{
                name: "house",
                value: "&#x1f3e0"
            }, {
                name: "house-with-garden",
                value: "&#x1f3e1"
            }, {
                name: "school",
                value: "&#x1f3eb"
            }, {
                name: "office",
                value: "&#x1f3e2"
            }, {
                name: "post-office",
                value: "&#x1f3e3"
            }, {
                name: "hospital",
                value: "&#x1f3e5"
            }, {
                name: "bank",
                value: "&#x1f3e6"
            }, {
                name: "convenience-store",
                value: "&#x1f3ea"
            }, {
                name: "love-hotel",
                value: "&#x1f3e9"
            }, {
                name: "hotel",
                value: "&#x1f3e8"
            }, {
                name: "wedding",
                value: "&#x1f492"
            }, {
                name: "church",
                value: "&#x26ea"
            }, {
                name: "department-store",
                value: "&#x1f3ec"
            }, {
                name: "european-post-office",
                value: "&#x1f3e4"
            }, {
                name: "private-use",
                value: "&#xe50a"
            }, {
                name: "city-sunrise",
                value: "&#x1f307"
            }, {
                name: "city-sunset",
                value: "&#x1f306"
            }, {
                name: "japanese-castle",
                value: "&#x1f3ef"
            }, {
                name: "european-castle",
                value: "&#x1f3f0"
            }, {
                name: "tent",
                value: "&#x26fa"
            }, {
                name: "factory",
                value: "&#x1f3ed"
            }, {
                name: "tokyo-tower",
                value: "&#x1f5fc"
            }, {
                name: "japan",
                value: "&#x1f5fe"
            }, {
                name: "mount-fuji",
                value: "&#x1f5fb"
            }, {
                name: "sunrise-over-mountains",
                value: "&#x1f304"
            }, {
                name: "sunrise",
                value: "&#x1f305"
            }, {
                name: "stars",
                value: "&#x1f303"
            }, {
                name: "statue-of-liberty",
                value: "&#x1f5fd"
            }, {
                name: "bridge-at-night",
                value: "&#x1f309"
            }, {
                name: "carousel-horse",
                value: "&#x1f3a0"
            }, {
                name: "ferris-wheel",
                value: "&#x1f3a1"
            }, {
                name: "fountain",
                value: "&#x26f2"
            }, {
                name: "roller-coaster",
                value: "&#x1f3a2"
            }, {
                name: "ship",
                value: "&#x1f6a2"
            }, {
                name: "boat",
                value: "&#x26f5"
            }, {
                name: "speedboat",
                value: "&#x1f6a4"
            }, {
                name: "rowboat",
                value: "&#x1f6a3"
            }, {
                name: "anchor",
                value: "&#x2693"
            }, {
                name: "rocket",
                value: "&#x1f680"
            }, {
                name: "airplane",
                value: "&#x2708"
            }, {
                name: "seat",
                value: "&#x1f4ba"
            }, {
                name: "helicopter",
                value: "&#x1f681"
            }, {
                name: "steam-locomotive",
                value: "&#x1f682"
            }, {
                name: "tram",
                value: "&#x1f68a"
            }, {
                name: "station",
                value: "&#x1f689"
            }, {
                name: "mountain-railway",
                value: "&#x1f69e"
            }, {
                name: "train2",
                value: "&#x1f686"
            }, {
                name: "bullettrain-side",
                value: "&#x1f684"
            }, {
                name: "bullettrain-front",
                value: "&#x1f685"
            }, {
                name: "light-rail",
                value: "&#x1f688"
            }, {
                name: "metro",
                value: "&#x1f687"
            }, {
                name: "monorail",
                value: "&#x1f69d"
            }, {
                name: "tram-car",
                value: "&#x1f68b"
            }, {
                name: "railway-car",
                value: "&#x1f683"
            }, {
                name: "trolleybus",
                value: "&#x1f68e"
            }, {
                name: "bus",
                value: "&#x1f68c"
            }, {
                name: "oncoming-bus",
                value: "&#x1f68d"
            }, {
                name: "blue-car",
                value: "&#x1f699"
            }, {
                name: "oncoming-automobile",
                value: "&#x1f698"
            }, {
                name: "car",
                value: "&#x1f697"
            }, {
                name: "taxi",
                value: "&#x1f695"
            }, {
                name: "oncoming-taxi",
                value: "&#x1f696"
            }, {
                name: "articulated-lorry",
                value: "&#x1f69b"
            }, {
                name: "truck",
                value: "&#x1f69a"
            }, {
                name: "rotating-light",
                value: "&#x1f6a8"
            }, {
                name: "police-car",
                value: "&#x1f693"
            }, {
                name: "oncoming-police-car",
                value: "&#x1f694"
            }, {
                name: "fire-engine",
                value: "&#x1f692"
            }, {
                name: "ambulance",
                value: "&#x1f691"
            }, {
                name: "minibus",
                value: "&#x1f690"
            }, {
                name: "bike",
                value: "&#x1f6b2"
            }, {
                name: "aerial-tramway",
                value: "&#x1f6a1"
            }, {
                name: "suspension-railway",
                value: "&#x1f69f"
            }, {
                name: "mountain-cableway",
                value: "&#x1f6a0"
            }, {
                name: "tractor",
                value: "&#x1f69c"
            }, {
                name: "barber",
                value: "&#x1f488"
            }, {
                name: "busstop",
                value: "&#x1f68f"
            }, {
                name: "ticket",
                value: "&#x1f3ab"
            }, {
                name: "vertical-traffic-light",
                value: "&#x1f6a6"
            }, {
                name: "traffic-light",
                value: "&#x1f6a5"
            }, {
                name: "warning",
                value: "&#x26a0"
            }, {
                name: "construction",
                value: "&#x1f6a7"
            }, {
                name: "beginner",
                value: "&#x1f530"
            }, {
                name: "fuelpump",
                value: "&#x26fd"
            }, {
                name: "izakaya-lantern",
                value: "&#x1f3ee"
            }, {
                name: "slot-machine",
                value: "&#x1f3b0"
            }, {
                name: "hotsprings",
                value: "&#x2668"
            }, {
                name: "moyai",
                value: "&#x1f5ff"
            }, {
                name: "circus-tent",
                value: "&#x1f3aa"
            }, {
                name: "performing-arts",
                value: "&#x1f3ad"
            }, {
                name: "round-pushpin",
                value: "&#x1f4cd"
            }, {
                name: "triangular-flag-on-post",
                value: "&#x1f6a9"
            }, {
                name: "cn",
                value: "&#x1f1e8;&#x1f1f3"
            }, {
                name: "de",
                value: "&#x1f1e9;&#x1f1ea"
            }, {
                name: "es",
                value: "&#x1f1ea;&#x1f1f8"
            }, {
                name: "fr",
                value: "&#x1f1eb;&#x1f1f7"
            }, {
                name: "gb",
                value: "&#x1f1ec;&#x1f1e7"
            }, {
                name: "it",
                value: "&#x1f1ee;&#x1f1f9"
            }, {
                name: "jp",
                value: "&#x1f1ef;&#x1f1f5"
            }, {
                name: "kr",
                value: "&#x1f1f0;&#x1f1f7"
            }, {
                name: "ru",
                value: "&#x1f1f7;&#x1f1fa"
            }, {
                name: "us",
                value: "&#x1f1fa;&#x1f1f8"
            }]
        },
        n = {};
    e.fn.lsxEmojiPicker = function(i) {
        n = e.extend({
            width: 220,
            height: 200,
            twemoji: !1,
            closeOnSelect: !0,
            onSelect: function() {}
        }, i);
        var r = e("<div></div>").addClass("lsx-emojipicker-appender"),
            o = e("<div></div>").addClass("lsx-emojipicker-container").css({
                top: -(n.height + 85)
            }),
            s = e("<div></div>").addClass("lsx-emojipicker-wrapper"),
            l = e("<div></div>").addClass("spinner-container"),
            c = e("<div></div>").addClass("loader");
        l.append(c);
        var d = e("<div></div>").addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-people").css({
                width: n.width,
                height: n.height
            }),
            _ = e("<div></div>").addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-nature hidden").css({
                width: n.width,
                height: n.height
            }),
            p = e("<div></div>").addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-place hidden").css({
                width: n.width,
                height: n.height
            }),
            h = e("<div></div>").addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-object hidden").css({
                width: n.width,
                height: n.height
            }),
            u = e("<ul></ul>").addClass("lsx-emojipicker-tabs"),
            f = e("<li></li>").addClass("selected").html(a.people[1].value).click((function(t) {
                t.preventDefault(), e("ul.lsx-emojipicker-tabs li").removeClass("selected"), e(this).addClass("selected"), e(".lsx-emoji-tab").addClass("hidden"), d.removeClass("hidden")
            })),
            v = e("<li></li>").html(a.nature[0].value).click((function(t) {
                t.preventDefault(), e("ul.lsx-emojipicker-tabs li").removeClass("selected"), e(this).addClass("selected"), e(".lsx-emoji-tab").addClass("hidden"), _.removeClass("hidden")
            })),
            m = e("<li></li>").html(a.place[38].value).click((function(t) {
                t.preventDefault(), e("ul.lsx-emojipicker-tabs li").removeClass("selected"), e(this).addClass("selected"), e(".lsx-emoji-tab").addClass("hidden"), p.removeClass("hidden")
            })),
            g = e("<li></li>").html(a.object[4].value).click((function(t) {
                t.preventDefault(), e("ul.lsx-emojipicker-tabs li").removeClass("selected"), e(this).addClass("selected"), e(".lsx-emoji-tab").addClass("hidden"), h.removeClass("hidden")
            }));
        return u.append(f).append(v).append(m).append(g), t("people", d, o), t("nature", _, o), t("place", p, o), t("object", h, o), s.append(d).append(_).append(p).append(h), s.append(u), o.append(s), r.append(o), this.append(r), n.twemoji && (twemoji.parse(d[0], {
            size: 72
        }), twemoji.parse(_[0], {
            size: 72
        }), twemoji.parse(p[0], {
            size: 72
        }), twemoji.parse(h[0], {
            size: 72
        }), twemoji.parse(u[0], {
            size: 72
        })), this.click((function(t) {
            t.preventDefault(), e(t.target).parent().hasClass("lsx-emojipicker-tabs") || e(t.target).parent().parent().hasClass("lsx-emojipicker-tabs") || e(t.target).parent().hasClass("lsx-emoji-tab") || e(t.target).parent().parent().hasClass("lsx-emoji-tab") || (o.is(":visible") ? o.hide() : o.fadeIn())
        })), this
    }
}(jQuery, window);
const EntryMoveableCreator = function() {
    function e() {
        const e = $("#photo_preview_container"),
            t = parseInt(e.css("left").replace("px", "")),
            a = parseInt(e.css("top").replace("px", ""));
        return {
            centerX: t + e.width() / 2,
            centerY: a + e.height() / 2
        }
    }

    function t() {
        const t = $("#photo_preview_container").height(),
            {
                centerX: a,
                centerY: n
            } = e(),
            i = t / 2 + n + 30;
        l.style.top = `${i}px`;
        const r = a - $("#photo_entry_menu").width() / 2;
        l.style.left = `${r}px`
    }

    function a(e, t, a, l) {
        const c = parseFloat(e.style.left.replace("px"), "");
        let d = c;
        const _ = -1;
        if (t.includes(_)) {
            d = c + (parseFloat(e.style.width.replace("px", "")) - a)
        }
        const p = parseFloat(e.style.height.replace("px", "")) - l,
            h = parseFloat(e.style.top.replace("px", "")) + p / 2;
        n(i(d, h, a, l, r(s)), o.clientWidth, o.clientHeight).length > 0 || (e.style.left = `${d}px`, e.style.top = `${h}px`, e.style.width = `${a}px`, e.style.height = `${l}px`)
    }

    function n(e, t, a) {
        const n = [],
            i = ["top-left", "top-right", "bottom-left", "bottom-right"];
        return e.forEach(((e, r) => {
            (e.x < 0 || e.x > t || e.y < 0 || e.y > a) && n.push(i[r])
        })), n
    }

    function i(e, t, a, n, i) {
        const r = e + a / 2,
            o = t + n / 2;
        return [{
            x: e,
            y: t
        }, {
            x: e + a,
            y: t
        }, {
            x: e,
            y: t + n
        }, {
            x: e + a,
            y: t + n
        }].map((e => {
            const t = e.x - r,
                a = e.y - o;
            return {
                x: r + (t * Math.cos(i) - a * Math.sin(i)),
                y: o + (t * Math.sin(i) + a * Math.cos(i))
            }
        }))
    }

    function r(e) {
        const t = window.getComputedStyle(e).transform;
        if ("none" === t) return 0;
        const a = t.match(/matrix\((.*)\)/)[1].split(", "),
            n = parseFloat(a[0]),
            i = parseFloat(a[1]);
        return Math.atan2(i, n)
    }
    let o, s, l;
    const c = {
        create: function() {
            o = document.querySelector("#new_and_edit_entry_modification_area"), s = document.querySelector("#photo_preview_container"), l = document.querySelector("#photo_entry_menu");
            const e = new Moveable(o, {
                target: s,
                draggable: !0,
                resizable: !0,
                rotatable: !0,
                origin: !1,
                scrollable: !0,
                keepRatio: !0,
                throttleDrag: 0,
                throttleResize: 0,
                throttleRotate: 0,
                renderDirections: ["w", "e"],
                snappable: !0,
                bounds: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    position: "css"
                }
            });
            return e.on("dragStart", (({
                target: e,
                clientX: t,
                clientY: a
            }) => {})).on("drag", (({
                target: e,
                transform: a,
                left: n,
                top: i,
                right: r,
                bottom: o,
                beforeDelta: s,
                beforeDist: l,
                delta: c,
                dist: d,
                clientX: _,
                clientY: p
            }) => {
                e.style.left = `${n}px`, e.style.top = `${i}px`, t()
            })).on("dragEnd", (({
                target: e,
                isDrag: t,
                clientX: a,
                clientY: n
            }) => {})), e.on("resizeStart", (({
                target: e,
                clientX: t,
                clientY: a
            }) => {})).on("resize", (({
                target: e,
                width: n,
                height: i,
                dist: r,
                delta: o,
                clientX: s,
                clientY: l,
                drag: c,
                direction: d
            }) => {
                function _(e, t) {
                    return e <= 30 || t <= 30
                }
                _(i, n) || (a(e, d, n, i), t())
            })).on("resizeEnd", (({
                target: e,
                isDrag: t,
                clientX: a,
                clientY: n
            }) => {})), e.on("rotateStart", (({
                target: e,
                clientX: t,
                clientY: a
            }) => {})).on("rotate", (({
                target: e,
                beforeDelta: a,
                delta: n,
                dist: i,
                transform: r,
                clientX: o,
                clientY: s
            }) => {
                const l = r.match(/rotate\(([^deg]+)deg\)/);
                let c = parseFloat(l[1]);
                c = Math.round(c), c %= 360, c < 0 && (c += 360), $("#photo_preview_container").data("angle", c), e.style.transform = r, t()
            })).on("rotateEnd", (({
                target: e,
                isDrag: t,
                clientX: a,
                clientY: n
            }) => {})), t(), $("#photo_entry_menu").show(), e
        }
    };
    return c
}();
var EntryRendererHelper = function() {
        var e = {
            plainText2HtmlSafe: function(e) {
                return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(?:\n\r?|\r\n?)/g, "<br>")
            },
            getEntryHtml: function(t, a) {
                var n;
                if ("text" === a.type) {
                    var i = e.plainText2HtmlSafe(a.content),
                        r = "entry_" + a.eid,
                        o = "position:absolute;  left:" + a.x + "px;  top:" + a.y + "px;  width:" + a.width + "px;";
                    let t = `\n        transform: rotate(${a.angle}deg) translateZ(0);\n        color: ${a.font_color};\n        font-family: gg-${a.font_name};\n        text-align: ${a.text_alignment};\n        font-size: ${a.font_size_px}px;\n      `;
                    var s = "";
                    if (!a.is_exclude_name) {
                        var l = "";
                        a.signer_name && (l = e.plainText2HtmlSafe(a.signer_name)), s += '<div class="position-relative"><span class="entry_css_rendered" spellcheck="false">' + l + "</span></div>"
                    }
                    var c = "entry";
                    (a.is_owner || a.is_card_admin) && (c += " entry_edit_clickable entry_interactable_cursor"), n = '<div class="' + c + '" id="' + r + '" data-entry_type="' + a.type + '" data-signer_name="' + a.signer_name?.replaceAll('"', "&quot;") + '" style="' + o + '"><div class="entry_css_rendered_rotation_padding" style="' + t + '"><div class="position-relative"><span class="entry_css_rendered" spellcheck="false">' + i + "</span></div>" + s + "</div></div>"
                } else {
                    let e = "entry";
                    (a.is_owner || a.is_card_admin) && (e += " entry_interactable_cursor", "photo" === a.type ? e += " entry_edit_clickable" : e += " entry_move_clickable");
                    const t = a.signer_name?.replaceAll('"', "&quot;") || "",
                        i = a.is_flip_x ? "yes" : "no",
                        r = a.is_flip_y ? "yes" : "no",
                        o = a.is_flip_x ? -1 : 1,
                        s = a.is_flip_y ? -1 : 1,
                        l = `transform: rotate(${a.angle}deg);`,
                        c = `transform: scale(${o}, ${s});`;
                    n = `\n        <div id="entry_${a.eid}"\n          class="${e}"\n          draggable="false"\n          ondragstart="return false"\n          data-entry_type="${a.type}"\n          data-signer_name="${t}"\n          data-is_flip_x="${i}"\n          data-is_flip_y="${r}"\n          data-angle="${a.angle}"\n          style="position: absolute;\n             width: ${a.width}px;\n             left: ${a.x}px;\n             top: ${a.y}px;\n             ${l}" >\n          <img src="${a.url}"\n            loading="lazy"\n            class="w-100"\n            style="${c}">\n        </div>\n      `
                }
                return n
            },
            renderEntries: function(e, t, a) {
                var n;
                for (n in t) {
                    var i, r = t[n];
                    for (i = 0; i < r.length; i += 1) {
                        var o = EntryRendererHelper.getEntryHtml(e, r[i]);
                        $("#" + a + " #canvas_page_" + n).append(o)
                    }
                }
            },
            getCoverPhotoEntryHtml: function(e) {
                var t = "rotateZ(" + e.angle + "deg) ";
                e.is_flip_x && (t += " scaleX(-1) "), e.is_flip_y && (t += " scaleY(-1) "), t += ";";
                var a = "rect(" + [0, e.cover_template_editable_photo_area.width + "px", e.cover_template_editable_photo_area.height + "px", 0].join(", ") + ")",
                    n = "";
                return e.cover_template_editable_photo_area.css_clip_path && (n = "clip-path:" + e.cover_template_editable_photo_area.css_clip_path + ";"), '<div data-id="' + e.id + '"      data-cover_template_editable_photo_area_id="' + e.cover_template_editable_photo_area.id + '"      data-angle="' + e.angle + '"      data-is_flip_x="' + e.is_flip_x + '"      data-is_flip_y="' + e.is_flip_y + '"      class="cover_photo_entry"      style="position: absolute;          clip:' + a + ";         " + n + "         width:" + e.cover_template_editable_photo_area.width + "px;          height:" + e.cover_template_editable_photo_area.height + "px;          left:" + e.cover_template_editable_photo_area.position_x + "px;          top:" + e.cover_template_editable_photo_area.position_y + 'px; ">   <div class="cover_photo_entry_inner"          style="position: absolute;          transform:' + t + "         width:" + e.width + "px;          height:" + e.height + "px;          left:" + e.offset_x + "px;          top:" + e.offset_y + 'px; ">    <img src="' + e.image_url + '"          loading="lazy"          draggable="false"          ondragstart="return false"          class="photo_image"          style="           width:100%;            user-select: none;            height:100%;">  </div></div>'
            },
            getCoverTextEntryHtml: function(t) {
                var a = "";
                return t.font_size_px && (a = "font-size: " + t.font_size_px + "px; "), '<div data-id="' + (t.id || "") + '"      data-cover_template_editable_text_area_id="' + t.cover_template_editable_text_area.id + '"      class="cover_text_entry entry_css_rendered"      style="position: absolute;          text-align:center;          display: inline-block;          ' + a + "          font-family: " + t.cover_template_editable_text_area.google_font.font_name + ";          color: " + t.cover_template_editable_text_area.font_color + ";          width:" + t.cover_template_editable_text_area.width + "px;          height:" + t.cover_template_editable_text_area.height + "px;          left:" + t.cover_template_editable_text_area.position_x + "px;          top:" + t.cover_template_editable_text_area.position_y + 'px; ">' + e.plainText2HtmlSafe(t.content) + "</div>"
            },
            renderCoverPhotoEntries: function(e, t) {
                var a, n = [];
                for (a = 0; a < e.length; a += 1) {
                    var i = e[a],
                        r = EntryRendererHelper.getCoverPhotoEntryHtml(i);
                    n.push(r)
                }
                $("#" + t).find(".cover_photo_entries").html(n.join("\n"))
            },
            renderCoverTextEntries: function(e, t) {
                var a, n = [];
                for (a = 0; a < e.length; a += 1) {
                    var i = e[a],
                        r = EntryRendererHelper.getCoverTextEntryHtml(i);
                    n.push(r)
                }
                $("#" + t).find(".cover_text_entries").html(n.join("\n"))
            },
            renderCoverDefaultTextEntries: function(e, t) {
                var a, n = [];
                for (a = 0; a < e.length; a += 1) {
                    var i = {
                            cover_template_editable_text_area: e[a],
                            content: e[a].default_text
                        },
                        r = EntryRendererHelper.getCoverTextEntryHtml(i);
                    n.push(r)
                }
                $("#" + t).find(".unoccupied_cover_template_editable_text_areas").html(n.join("\n"))
            }
        };
        return e
    }(),
    FormHelper = function() {
        var e = {
            debounce: function(e, t, a) {
                var n;
                return function() {
                    var i = this,
                        r = arguments,
                        o = function() {
                            n = null, a || e.apply(i, r)
                        },
                        s = a && !n;
                    clearTimeout(n), n = setTimeout(o, t), s && e.apply(i, r)
                }
            }
        };
        return e
    }(),
    GiftCardUI = function() {
        function e(e, t) {
            if (!e.id) return e.text;
            var a = "";
            return a += '<div class="">', a += '<span class="fi fi-' + $(e.element).html().trim().toLowerCase() + '" style="width:28px; height:21px; position:relative; top:-2px;"></span>', t && (a += '<i class="carat_down_icon fas fa-caret-down" style="position:relative; right:-20px;"></i>'), a += "</div>", $(a)
        }

        function t(e, t, a) {
            let n = e?.arbitrary_denomination[0]?.min_amount || a,
                o = e.denominations;
            var s, l = 4,
                c = [];
            for (s = 0; s < o.length; s += 1) {
                var d = o.length - s,
                    _ = o[s].price;
                _ <= i && _ >= n && "GOOD" === o[s].stock_level && (c.length + d < l || !t.includes(_)) && c.push(o[s])
            }
            if (null === r) p = c;
            else {
                var p = [];
                for (s = 0; s < c.length && !(c[s].amount > r); s += 1) p.push(c[s])
            }
            return p
        }

        function a(e, a, i, r, o) {
            const s = t(i, r, o);
            var l = [];
            if (s.length > 0 && (l.push("<div class='text-nowrap' style='overflow-x:auto'>"), s.forEach((function(e) {
                    var t = e.amount / 100;
                    t += " " + e.currency, l.push('        <div data-denomination_currency="' + e.currency + '"              data-denomination_amount="' + e.amount + '"              data-country_code="' + a + '"              class="gift_card_denomination badge badge-soft-dark badge-pill py-3 px-4 m-2 d-inline-block"              style="cursor:pointer;">          ' + t + "        </div>")
                })), l.push("</div>")), i.arbitrary_denomination.length > 0) {
                var c = i.arbitrary_denomination[0];
                l.push('        <div id="custom_denomination"              data-denomination_currency="' + c.currency + '"              class="gift_card_denomination badge badge-soft-dark badge-pill px-2 m-2"             style="height:44px; max-width:140px; padding:6px 8px;">          <div class="input-group input-group-merge">            <input class="form-control"                   id="prezzee_gift_card_custom_denomination"                   type="text"                   style="border-radius: 1rem;                     height: 2rem;">          </div>        </div>')
            }
            e.find(".gift_card_denominations").html(l.join("")), e.find(".gift_card_amount_ribbon").hide(), e.find(".gift_card_amount_ribbon_amount").html(""), n.validateContributeGiftCardValue(e, o)
        }
        var n = {},
            i = 5e4,
            r = null,
            o = null;
        return n.filterPrezzeeProductsResults = function(e) {
            var t = e.find("#prezzee_gift_card_search").val().trim().toLowerCase(),
                a = e.find("#is_allow_group_contribution_checkbox").is(":checked"),
                n = e.find("#prezzee_gift_card_country_picker").val();
            e.find("#gift_card_products .gift_card_product_by_country_code").hide();
            const i = e.find(`#gift_card_products .gift_card_product_by_country_code[data-prezzee_product_country_code="${n}"]`);
            i.show(), i.find(".gift_card_product").each((function() {
                var e = !0;
                ("" !== t && ($(this).data("prezzee_product_name").toLowerCase().includes(t) || $(this).data("included_prezzee_brand_names")?.toLowerCase()?.includes(t) || $(this).data("found_in_prezzee_product_names")?.toLowerCase()?.includes(t) || (e = !1)), a) && ($(this).data("prezzee_product_has_arbitrary_denomination") || (e = !1));
                e ? $(this).fadeIn("fast") : $(this).hide()
            }));
            const r = e.find(`\n      .all_gift_cards \n      .gift_card_product_by_country_code[data-prezzee_product_country_code="${n}"] \n      .gift_card_product\n    `);
            "" === t ? (r.sort(((e, t) => $(t).data("sort_value") < $(e).data("sort_value") ? 1 : -1)).appendTo(i.find("ul.is_searchable")), $(".gg_smart_egift_card_searchable").hide(), 0 === i.has(".gg_smart_egift_card_searchable").length ? $(".gg_smart_egift_cards_promotional").hide() : $(".gg_smart_egift_cards_promotional").fadeIn("fast")) : (r.sort(((e, a) => {
                const n = $(e).data("prezzee_product_name").toLowerCase(),
                    i = $(a).data("prezzee_product_name").toLowerCase(),
                    r = n.startsWith(t),
                    o = i.startsWith(t);
                return r && o ? n.localeCompare(i) : r ? -1 : o || $(a).data("sort_value") < $(e).data("sort_value") ? 1 : -1
            })).appendTo(i.find("ul.is_searchable")), $(".gg_smart_egift_cards_promotional").hide())
        }, n.validateContributeGiftCardCustomValue = function(e, t) {
            var a = e.find("#prezzee_gift_card_custom_denomination"),
                n = a.val();
            n = n.replace(/\D/g, ""), a.val(n), GiftCardUI.validateContributeGiftCardValue(e, t)
        }, n.validateContributeGiftCardValue = function(e, t) {
            if (0 === e.find(".gift_card_denominations .gift_card_denomination.denomination_selected").length) return e.find(".validation_message_container").html('<div class="alert alert-danger">Please select an amount</div>'), e.find(".submit_pay_gift_card_button").attr("disabled", !0), !1;
            var a = t,
                s = o?.arbitrary_denomination[0]?.min_amount;
            void 0 !== s && (s = parseInt(s, 10)) >= 0 && (a = s), a < t && (a = t);
            var l = i,
                c = o?.arbitrary_denomination[0]?.max_amount;
            void 0 !== c && (c = parseInt(c, 10)) >= 0 && (l = Math.min(c, l), null !== r && (l = Math.min(r, l)));
            const d = e.find(".add_amount_info_for_card_creator");
            var _ = n.getSelectedGiftCardAmount(e);
            if (_.amount >= a && _.amount <= l) {
                e.find(".submit_pay_gift_card_button").attr("disabled", !1), e.find(".gift_card_denomination_hint_message").hide(), e.find(".gift_card_cancel_warning_message").fadeIn("fast"), e.find(".gift_card_amount_ribbon").fadeIn("fast");
                const t = _.amount / 100,
                    a = t + " <small>" + _.currency + "</small>";
                if (e.find(".gift_card_amount_ribbon_amount").html(a), d.length) {
                    const e = d.data("current_total") + t;
                    d.find(".gift_card_add_amount").html(t), d.find(".gift_card_new_total").html(e), d.show()
                }
                return !0
            }
            return e.find(".submit_pay_gift_card_button").attr("disabled", !0), e.find(".gift_card_cancel_warning_message").hide(), e.find(".gift_card_denomination_hint_message").html("Please enter a value from " + a / 100 + " to " + l / 100), e.find(".gift_card_denomination_hint_message").fadeIn("fast"), e.find(".gift_card_amount_ribbon").hide(), e.find(".gift_card_amount_ribbon_amount").html(""), d.hide(), !1
        }, n.getSelectedGiftCardAmount = function(e) {
            var t = 0,
                a = e.find(".gift_card_denominations .gift_card_denomination.denomination_selected");
            return "custom_denomination" === a.attr("id") ? "" === (t = e.find("#prezzee_gift_card_custom_denomination").val()) ? t = 0 : (t = parseInt(t, 10), t *= 100) : t = a.data("denomination_amount"), {
                amount: t,
                currency: a.data("denomination_currency")
            }
        }, n.renderSelectedGiftCardBrand = function(e, t, n, i, s, l) {
            i && (r = i), o = n;
            const c = e.find(".gift_card_preview_image");
            if (n) {
                const i = n.themes[0].thumbnail_url;
                c.attr("src", i), c.show(), e.find(".gift_card_denominations").length > 0 && a(e, t, n, s, l)
            } else c.hide()
        }, n.bindPrezzeeProductFilterEvents = function(t) {
            t.find("#prezzee_gift_card_search").bind("input propertychange", FormHelper.debounce((function() {
                GiftCardUI.filterPrezzeeProductsResults(t)
            }), 500)), t.find("#is_allow_group_contribution_checkbox").change((function() {
                GiftCardUI.filterPrezzeeProductsResults(t)
            })), t.find("#prezzee_gift_card_country_picker").select2({
                width: "resolve",
                dropdownAutoWidth: !0,
                minimumResultsForSearch: -1,
                dropdownParent: $("#prezzee_gift_card_product_picker"),
                templateResult: function(t) {
                    return e(t, !1)
                },
                templateSelection: function(t) {
                    return e(t, !0)
                }
            }), t.find("#prezzee_gift_card_country_picker").change((function() {
                GiftCardUI.filterPrezzeeProductsResults(t)
            }))
        }, n.bindPrezzeeProductAmountEvent = function(e, t) {
            e.find(".gift_card_denominations").on("click", ".gift_card_denomination", (function() {
                e.find(".gift_card_denomination").addClass("badge-soft-dark").removeClass("badge-info").removeClass("denomination_selected"), $(this).removeClass("badge-soft-dark").addClass("badge-info").addClass("denomination_selected"), GiftCardUI.validateContributeGiftCardValue(e, t)
            }))
        }, n
    }();
const GoogleOauthHelper = function() {
    function e(e) {
        $.ajax({
            type: "POST",
            url: i,
            data: {
                authenticity_token: t,
                credential: e.credential
            },
            success: function(e) {
                switch (e.status) {
                    case "error":
                        let t = "";
                        Object.keys(e.data).forEach((function(a) {
                            t += `${a} ${e.data[a]}.<br>`
                        })), $(n).hide().html(t).fadeIn("fast");
                        break;
                    case "success":
                        o(e)
                }
            },
            error: function() {}
        })
    }
    let t, a, n, i = "/google_auth",
        r = "/account",
        o = function(e) {
            window.location.href = "redirect_url" in e ? e.redirect_url : r
        },
        s = {
            init: function(i, r, s, l) {
                t = r, n = l, "function" == typeof s && (o = s);
                let c = window.innerWidth - 78;
                const d = 400;
                c > d && (c = d), i.forEach((function(t, n) {
                    a = $("#" + t).data("google_auth_client_id"), google.accounts.id.initialize({
                        client_id: a,
                        callback: e,
                        cancel_on_tap_outside: !1,
                        ux_mode: "popup"
                    }), google.accounts.id.renderButton(document.getElementById(t), {
                        text: "continue_with",
                        theme: "outline",
                        size: "large",
                        width: c
                    }), 0 === n && google.accounts.id.prompt()
                }))
            }
        };
    return s
}();
! function(e) {
    function t(e, t, a) {
        if (!a[0] || "object" == typeof a[0]) return t.init.apply(e, a);
        if (t[a[0]]) return t[a[0]].apply(e, Array.prototype.slice.call(a, 1));
        throw _(a[0] + " is not a method or property")
    }

    function a(e, t, a, n) {
        return {
            css: {
                position: "absolute",
                top: e,
                left: t,
                overflow: n || "hidden",
                zIndex: a || "auto"
            }
        }
    }

    function n(e, t, a, n, r) {
        var o = 1 - r,
            s = o * o * o,
            l = r * r * r;
        return i(Math.round(s * e.x + 3 * r * o * o * t.x + 3 * r * r * o * a.x + l * n.x), Math.round(s * e.y + 3 * r * o * o * t.y + 3 * r * r * o * a.y + l * n.y))
    }

    function i(e, t) {
        return {
            x: e,
            y: t
        }
    }

    function r(e, t, a) {
        return h && a ? " translate3d(" + e + "px," + t + "px, 0px) " : " translate(" + e + "px, " + t + "px) "
    }

    function o(e) {
        return " rotate(" + e + "deg) "
    }

    function s(e, t) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    function l() {
        for (var e = ["Moz", "Webkit", "Khtml", "O", "ms"], t = e.length, a = ""; t--;) e[t] + "Transform" in document.body.style && (a = "-" + e[t].toLowerCase() + "-");
        return a
    }

    function c(e, t, a, n, r) {
        var o, s = [];
        if ("-webkit-" == f) {
            for (o = 0; o < r; o++) s.push("color-stop(" + n[o][0] + ", " + n[o][1] + ")");
            e.css({
                "background-image": "-webkit-gradient(linear, " + t.x + "% " + t.y + "%," + a.x + "% " + a.y + "%, " + s.join(",") + " )"
            })
        } else {
            t = {
                x: t.x / 100 * e.width(),
                y: t.y / 100 * e.height()
            };
            var l = (a = {
                x: a.x / 100 * e.width(),
                y: a.y / 100 * e.height()
            }).x - t.x;
            o = a.y - t.y;
            var c = Math.atan2(o, l),
                d = c - Math.PI / 2,
                _ = (d = Math.abs(e.width() * Math.sin(d)) + Math.abs(e.height() * Math.cos(d)), l = Math.sqrt(o * o + l * l), a = i(a.x < t.x ? e.width() : 0, a.y < t.y ? e.height() : 0), Math.tan(c));
            for (a = (o = -1 / _) * (_ = (o * a.x - a.y - _ * t.x + t.y) / (o - _)) - o * a.x + a.y, t = Math.sqrt(Math.pow(_ - t.x, 2) + Math.pow(a - t.y, 2)), o = 0; o < r; o++) s.push(" " + n[o][1] + " " + 100 * (t + l * n[o][0]) / d + "%");
            e.css({
                "background-image": f + "linear-gradient(" + -c + "rad," + s.join(",") + ")"
            })
        }
    }

    function d(t, a, n) {
        return t = e.Event(t), a.trigger(t, n), t.isDefaultPrevented() ? "prevented" : t.isPropagationStopped() ? "stopped" : ""
    }

    function _(e) {
        function t(e) {
            this.name = "TurnJsError", this.message = e
        }
        return t.prototype = Error(), t.prototype.constructor = t, new t(e)
    }

    function p(e) {
        var t = {
            top: 0,
            left: 0
        };
        do {
            t.left += e.offsetLeft, t.top += e.offsetTop
        } while (e = e.offsetParent);
        return t
    }
    var h, u, f = "",
        v = Math.PI,
        m = v / 2,
        g = "ontouchstart" in window,
        y = g ? {
            down: "touchstart",
            move: "touchmove",
            up: "touchend",
            over: "touchstart",
            out: "touchend"
        } : {
            down: "mousedown",
            move: "mousemove",
            up: "mouseup",
            over: "mouseover",
            out: "mouseout"
        },
        x = {
            backward: ["bl", "tl"],
            forward: ["br", "tr"],
            all: "tl bl tr br l r".split(" ")
        },
        b = ["single", "double"],
        w = ["ltr", "rtl"],
        $ = {
            acceleration: !0,
            display: "double",
            duration: 600,
            page: 1,
            gradients: !0,
            turnCorners: "bl,br",
            when: null
        },
        k = {
            cornerSize: 100
        },
        C = {
            init: function(t) {
                var a, n;
                h = "WebKitCSSMatrix" in window || "MozPerspective" in document.body.style, u = !(a = /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)) || 534.3 < parseFloat(a[1]), f = l(), a = 0;
                var i = this.data(),
                    o = this.children();
                t = e.extend({
                    width: this.width(),
                    height: this.height(),
                    direction: this.attr("dir") || this.css("direction") || "ltr"
                }, $, t);
                if (i.opts = t, i.pageObjs = {}, i.pages = {}, i.pageWrap = {}, i.pageZoom = {}, i.pagePlace = {}, i.pageMv = [], i.zoom = 1, i.totalPages = t.pages || 0, i.eventHandlers = {
                        touchStart: e.proxy(C._touchStart, this),
                        touchMove: e.proxy(C._touchMove, this),
                        touchEnd: e.proxy(C._touchEnd, this),
                        start: e.proxy(C._eventStart, this)
                    }, t.when)
                    for (n in t.when) s(n, t.when) && this.bind(n, t.when[n]);
                for (this.css({
                        position: "relative",
                        width: t.width,
                        height: t.height
                    }), this.turn("display", t.display), "" !== t.direction && this.turn("direction", t.direction), h && !g && t.acceleration && this.transform(r(0, 0, !0)), n = 0; n < o.length; n++) "1" != e(o[n]).attr("ignore") && this.turn("addPage", o[n], ++a);
                return e(this).bind(y.down, i.eventHandlers.touchStart).bind("end", C._eventEnd).bind("pressed", C._eventPressed).bind("released", C._eventReleased).bind("flip", C._flip), e(this).parent().bind("start", i.eventHandlers.start), e(document).bind(y.move, i.eventHandlers.touchMove).bind(y.up, i.eventHandlers.touchEnd), this.turn("page", t.page), i.done = !0, this
            },
            addPage: function(t, a) {
                var n, i = !1,
                    r = this.data(),
                    o = r.totalPages + 1;
                if (r.destroying) return !1;
                if ((n = /\bp([0-9]+)\b/.exec(e(t).attr("class"))) && (a = parseInt(n[1], 10)), a) {
                    if (a == o) i = !0;
                    else if (a > o) throw _('Page "' + a + '" cannot be inserted')
                } else a = o, i = !0;
                return 1 <= a && a <= o && (n = "double" == r.display ? a % 2 ? " odd" : " even" : "", r.done && this.turn("stop"), a in r.pageObjs && C._movePages.call(this, a, 1), i && (r.totalPages = o), r.pageObjs[a] = e(t).css({
                    float: "left"
                }).addClass("page p" + a + n), -1 != navigator.userAgent.indexOf("MSIE 9.0") && r.pageObjs[a].hasClass("hard") && r.pageObjs[a].removeClass("hard"), C._addPage.call(this, a), C._removeFromDOM.call(this)), this
            },
            _addPage: function(t) {
                var a = this.data(),
                    n = a.pageObjs[t];
                if (n)
                    if (C._necessPage.call(this, t)) {
                        if (!a.pageWrap[t]) {
                            a.pageWrap[t] = e("<div/>", {
                                class: "page-wrapper",
                                page: t,
                                css: {
                                    position: "absolute",
                                    overflow: "hidden"
                                }
                            }), this.append(a.pageWrap[t]), a.pagePlace[t] || (a.pagePlace[t] = t, a.pageObjs[t].appendTo(a.pageWrap[t]));
                            var i = C._pageSize.call(this, t, !0);
                            n.css({
                                width: i.width,
                                height: i.height
                            }), a.pageWrap[t].css(i)
                        }
                        a.pagePlace[t] == t && C._makeFlip.call(this, t)
                    } else a.pagePlace[t] = 0, a.pageObjs[t] && a.pageObjs[t].remove()
            },
            hasPage: function(e) {
                return s(e, this.data().pageObjs)
            },
            center: function(t) {
                var a = this.data(),
                    n = e(this).turn("size"),
                    i = 0;
                return a.noCenter || ("double" == a.display && (t = this.turn("view", t || a.tpage || a.page), "ltr" == a.direction ? t[0] ? t[1] || (i += n.width / 4) : i -= n.width / 4 : t[0] ? t[1] || (i -= n.width / 4) : i += n.width / 4), e(this).css({
                    marginLeft: i
                })), this
            },
            destroy: function() {
                var t = this,
                    a = this.data(),
                    n = "end first flip last pressed released start turning turned zooming missing".split(" ");
                if ("prevented" != d("destroying", this)) {
                    for (a.destroying = !0, e.each(n, (function(e, a) {
                            t.unbind(a)
                        })), this.parent().unbind("start", a.eventHandlers.start), e(document).unbind(y.move, a.eventHandlers.touchMove).unbind(y.up, a.eventHandlers.touchEnd); 0 !== a.totalPages;) this.turn("removePage", a.totalPages);
                    return a.fparent && a.fparent.remove(), a.shadow && a.shadow.remove(), this.removeData(), a = null, this
                }
            },
            is: function() {
                return "object" == typeof this.data().pages
            },
            zoom: function(t) {
                var a = this.data();
                if ("number" == typeof t) {
                    if (.001 > t || 100 < t) throw _(t + " is not a value for zoom");
                    if ("prevented" == d("zooming", this, [t, a.zoom])) return this;
                    var n = this.turn("size"),
                        i = this.turn("view"),
                        r = 1 / a.zoom,
                        o = Math.round(n.width * r * t);
                    n = Math.round(n.height * r * t);
                    for (a.zoom = t, e(this).turn("stop").turn("size", o, n), a.opts.autoCenter && this.turn("center"), C._updateShadow.call(this), t = 0; t < i.length; t++) i[t] && a.pageZoom[i[t]] != a.zoom && (this.trigger("zoomed", [i[t], i, a.pageZoom[i[t]], a.zoom]), a.pageZoom[i[t]] = a.zoom);
                    return this
                }
                return a.zoom
            },
            _pageSize: function(e, t) {
                var a = this.data(),
                    n = {};
                if ("single" == a.display) n.width = this.width(), n.height = this.height(), t && (n.top = 0, n.left = 0, n.right = "auto");
                else {
                    var i = this.width() / 2,
                        r = this.height();
                    if (a.pageObjs[e].hasClass("own-size") ? (n.width = a.pageObjs[e].width(), n.height = a.pageObjs[e].height()) : (n.width = i, n.height = r), t) {
                        var o = e % 2;
                        n.top = (r - n.height) / 2, "ltr" == a.direction ? (n[o ? "right" : "left"] = i - n.width, n[o ? "left" : "right"] = "auto") : (n[o ? "left" : "right"] = i - n.width, n[o ? "right" : "left"] = "auto")
                    }
                }
                return n
            },
            _makeFlip: function(e) {
                var t = this.data();
                if (!t.pages[e] && t.pagePlace[e] == e) {
                    var a = "single" == t.display,
                        n = e % 2;
                    t.pages[e] = t.pageObjs[e].css(C._pageSize.call(this, e)).flip({
                        page: e,
                        next: n || a ? e + 1 : e - 1,
                        turn: this
                    }).flip("disable", t.disabled), C._setPageLoc.call(this, e), t.pageZoom[e] = t.zoom
                }
                return t.pages[e]
            },
            _makeRange: function() {
                var e, t;
                if (!(1 > this.data().totalPages))
                    for (e = (t = this.turn("range"))[0]; e <= t[1]; e++) C._addPage.call(this, e)
            },
            range: function(e) {
                var t, a, n, i = this.data();
                e = e || i.tpage || i.page || 1;
                if (n = C._view.call(this, e), 1 > e || e > i.totalPages) throw _('"' + e + '" is not a valid page');
                return n[1] = n[1] || n[0], 1 <= n[0] && n[1] <= i.totalPages ? (e = Math.floor(2), i.totalPages - n[1] > n[0] ? a = 2 * e - (t = Math.min(n[0] - 1, e)) : t = 2 * e - (a = Math.min(i.totalPages - n[1], e))) : a = t = 5, [Math.max(1, n[0] - t), Math.min(i.totalPages, n[1] + a)]
            },
            _necessPage: function(e) {
                if (0 === e) return !0;
                var t = this.turn("range");
                return this.data().pageObjs[e].hasClass("fixed") || e >= t[0] && e <= t[1]
            },
            _removeFromDOM: function() {
                var e, t = this.data();
                for (e in t.pageWrap) s(e, t.pageWrap) && !C._necessPage.call(this, e) && C._removePageFromDOM.call(this, e)
            },
            _removePageFromDOM: function(e) {
                var t = this.data();
                if (t.pages[e]) {
                    var a = t.pages[e].data();
                    D._moveFoldingPage.call(t.pages[e], !1), a.f && a.f.fwrapper && a.f.fwrapper.remove(), t.pages[e].removeData(), t.pages[e].remove(), delete t.pages[e]
                }
                t.pageObjs[e] && t.pageObjs[e].remove(), t.pageWrap[e] && (t.pageWrap[e].remove(), delete t.pageWrap[e]), C._removeMv.call(this, e), delete t.pagePlace[e], delete t.pageZoom[e]
            },
            removePage: function(e) {
                var t = this.data();
                if ("*" == e)
                    for (; 0 !== t.totalPages;) this.turn("removePage", t.totalPages);
                else {
                    if (1 > e || e > t.totalPages) throw _("The page " + e + " doesn't exist");
                    t.pageObjs[e] && (this.turn("stop"), C._removePageFromDOM.call(this, e), delete t.pageObjs[e]), C._movePages.call(this, e, -1), t.totalPages -= 1, t.page > t.totalPages ? (t.page = null, C._fitPage.call(this, t.totalPages)) : (C._makeRange.call(this), this.turn("update"))
                }
                return this
            },
            _movePages: function(e, t) {
                var a, n = this,
                    i = this.data(),
                    r = "single" == i.display,
                    o = function(e) {
                        var a = e + t,
                            o = a % 2,
                            s = o ? " odd " : " even ";
                        i.pageObjs[e] && (i.pageObjs[a] = i.pageObjs[e].removeClass("p" + e + " odd even").addClass("p" + a + s)), i.pagePlace[e] && i.pageWrap[e] && (i.pagePlace[a] = a, i.pageWrap[a] = i.pageObjs[a].hasClass("fixed") ? i.pageWrap[e].attr("page", a) : i.pageWrap[e].css(C._pageSize.call(n, a, !0)).attr("page", a), i.pages[e] && (i.pages[a] = i.pages[e].flip("options", {
                            page: a,
                            next: r || o ? a + 1 : a - 1
                        })), t && (delete i.pages[e], delete i.pagePlace[e], delete i.pageZoom[e], delete i.pageObjs[e], delete i.pageWrap[e]))
                    };
                if (0 < t)
                    for (a = i.totalPages; a >= e; a--) o(a);
                else
                    for (a = e; a <= i.totalPages; a++) o(a)
            },
            display: function(t) {
                var a = this.data(),
                    n = a.display;
                if (void 0 === t) return n;
                if (-1 == e.inArray(t, b)) throw _('"' + t + '" is not a value for display');
                switch (t) {
                    case "single":
                        a.pageObjs[0] || (this.turn("stop").css({
                            overflow: "hidden"
                        }), a.pageObjs[0] = e("<div />", {
                            class: "page p-temporal"
                        }).css({
                            width: this.width(),
                            height: this.height()
                        }).appendTo(this)), this.addClass("shadow");
                        break;
                    case "double":
                        a.pageObjs[0] && (this.turn("stop").css({
                            overflow: ""
                        }), a.pageObjs[0].remove(), delete a.pageObjs[0]), this.removeClass("shadow")
                }
                return a.display = t, n && (t = this.turn("size"), C._movePages.call(this, 1, 0), this.turn("size", t.width, t.height).turn("update")), this
            },
            direction: function(t) {
                var a = this.data();
                if (void 0 === t) return a.direction;
                if (t = t.toLowerCase(), -1 == e.inArray(t, w)) throw _('"' + t + '" is not a value for direction');
                return "rtl" == t && e(this).attr("dir", "ltr").css({
                    direction: "ltr"
                }), a.direction = t, a.done && this.turn("size", e(this).width(), e(this).height()), this
            },
            animating: function() {
                return 0 < this.data().pageMv.length
            },
            corner: function() {
                var e, t, a = this.data();
                for (t in a.pages)
                    if (s(t, a.pages) && (e = a.pages[t].flip("corner"))) return e;
                return !1
            },
            data: function() {
                return this.data()
            },
            disable: function(t) {
                var a, n = this.data(),
                    i = this.turn("view");
                for (a in n.disabled = void 0 === t || !0 === t, n.pages) s(a, n.pages) && n.pages[a].flip("disable", !!n.disabled || -1 == e.inArray(parseInt(a, 10), i));
                return this
            },
            disabled: function(e) {
                return void 0 === e ? !0 === this.data().disabled : this.turn("disable", e)
            },
            size: function(e, t) {
                if (void 0 === e || void 0 === t) return {
                    width: this.width(),
                    height: this.height()
                };
                this.turn("stop");
                var a, n, i = this.data();
                for (a in n = "double" == i.display ? e / 2 : e, this.css({
                        width: e,
                        height: t
                    }), i.pageObjs[0] && i.pageObjs[0].css({
                        width: n,
                        height: t
                    }), i.pageWrap) s(a, i.pageWrap) && (n = C._pageSize.call(this, a, !0), i.pageObjs[a].css({
                    width: n.width,
                    height: n.height
                }), i.pageWrap[a].css(n), i.pages[a] && i.pages[a].css({
                    width: n.width,
                    height: n.height
                }));
                return this.turn("resize"), this
            },
            resize: function() {
                var e, t = this.data();
                for (t.pages[0] && (t.pageWrap[0].css({
                        left: -this.width()
                    }), t.pages[0].flip("resize", !0)), e = 1; e <= t.totalPages; e++) t.pages[e] && t.pages[e].flip("resize", !0);
                C._updateShadow.call(this), t.opts.autoCenter && this.turn("center")
            },
            _removeMv: function(e) {
                var t, a = this.data();
                for (t = 0; t < a.pageMv.length; t++)
                    if (a.pageMv[t] == e) return a.pageMv.splice(t, 1), !0;
                return !1
            },
            _addMv: function(e) {
                var t = this.data();
                C._removeMv.call(this, e), t.pageMv.push(e)
            },
            _view: function(e) {
                var t = this.data();
                e = e || t.page;
                return "double" == t.display ? e % 2 ? [e - 1, e] : [e, e + 1] : [e]
            },
            view: function(e) {
                var t = this.data();
                e = C._view.call(this, e);
                return "double" == t.display ? [0 < e[0] ? e[0] : 0, e[1] <= t.totalPages ? e[1] : 0] : [0 < e[0] && e[0] <= t.totalPages ? e[0] : 0]
            },
            stop: function(e, t) {
                if (this.turn("animating")) {
                    var a, n, i, r = this.data();
                    for (r.tpage && (r.page = r.tpage, delete r.tpage), a = 0; a < r.pageMv.length; a++) r.pageMv[a] && r.pageMv[a] !== e && (n = (i = r.pages[r.pageMv[a]]).data().f.opts, i.flip("hideFoldedPage", t), t || D._moveFoldingPage.call(i, !1), n.force && (n.next = 0 == n.page % 2 ? n.page - 1 : n.page + 1, delete n.force))
                }
                return this.turn("update"), this
            },
            pages: function(e) {
                var t = this.data();
                if (e) {
                    if (e < t.totalPages)
                        for (var a = t.totalPages; a > e; a--) this.turn("removePage", a);
                    return t.totalPages = e, C._fitPage.call(this, t.page), this
                }
                return t.totalPages
            },
            _missing: function(e) {
                var t = this.data();
                if (!(1 > t.totalPages)) {
                    var a = this.turn("range", e),
                        n = [];
                    for (e = a[0]; e <= a[1]; e++) t.pageObjs[e] || n.push(e);
                    0 < n.length && this.trigger("missing", [n])
                }
            },
            _fitPage: function(e) {
                var t = this.data(),
                    a = this.turn("view", e);
                if (C._missing.call(this, e), t.pageObjs[e]) {
                    t.page = e, this.turn("stop");
                    for (var n = 0; n < a.length; n++) a[n] && t.pageZoom[a[n]] != t.zoom && (this.trigger("zoomed", [a[n], a, t.pageZoom[a[n]], t.zoom]), t.pageZoom[a[n]] = t.zoom);
                    C._removeFromDOM.call(this), C._makeRange.call(this), C._updateShadow.call(this), this.trigger("turned", [e, a]), this.turn("update"), t.opts.autoCenter && this.turn("center")
                }
            },
            _turnPage: function(t) {
                var a, n, i = this.data(),
                    r = i.pagePlace[t],
                    o = this.turn("view"),
                    s = this.turn("view", t);
                if (i.page != t) {
                    var l = i.page;
                    if ("prevented" == d("turning", this, [t, s])) return void(l == i.page && -1 != e.inArray(r, i.pageMv) && i.pages[r].flip("hideFoldedPage", !0)); - 1 != e.inArray(1, s) && this.trigger("first"), -1 != e.inArray(i.totalPages, s) && this.trigger("last")
                }
                "single" == i.display ? (a = o[0], n = s[0]) : o[1] && t > o[1] ? (a = o[1], n = s[0]) : o[0] && t < o[0] && (a = o[0], n = s[1]), r = i.opts.turnCorners.split(","), s = (o = i.pages[a].data().f).opts, l = o.point, C._missing.call(this, t), i.pageObjs[t] && (this.turn("stop"), i.page = t, C._makeRange.call(this), i.tpage = n, s.next != n && (s.next = n, s.force = !0), this.turn("update"), o.point = l, "hard" == o.effect ? "ltr" == i.direction ? i.pages[a].flip("turnPage", t > a ? "r" : "l") : i.pages[a].flip("turnPage", t > a ? "l" : "r") : "ltr" == i.direction ? i.pages[a].flip("turnPage", r[t > a ? 1 : 0]) : i.pages[a].flip("turnPage", r[t > a ? 0 : 1]))
            },
            page: function(t) {
                var a = this.data();
                if (void 0 === t) return a.page;
                if (!a.disabled && !a.destroying) {
                    if (0 < (t = parseInt(t, 10)) && t <= a.totalPages) return t != a.page && (a.done && -1 == e.inArray(t, this.turn("view")) ? C._turnPage.call(this, t) : C._fitPage.call(this, t)), this;
                    throw _("The page " + t + " does not exist")
                }
            },
            next: function() {
                return this.turn("page", Math.min(this.data().totalPages, C._view.call(this, this.data().page).pop() + 1))
            },
            previous: function() {
                return this.turn("page", Math.max(1, C._view.call(this, this.data().page).shift() - 1))
            },
            peel: function(e, t) {
                var a = this.data(),
                    n = this.turn("view");
                t = void 0 === t || !0 === t;
                return !1 === e ? this.turn("stop", null, t) : "single" == a.display ? a.pages[a.page].flip("peel", e, t) : (n = "ltr" == a.direction ? -1 != e.indexOf("l") ? n[0] : n[1] : -1 != e.indexOf("l") ? n[1] : n[0], a.pages[n] && a.pages[n].flip("peel", e, t)), this
            },
            _addMotionPage: function() {
                var t = e(this).data().f.opts,
                    a = t.turn;
                a.data(), C._addMv.call(a, t.page)
            },
            _eventStart: function(e, t, a) {
                var n = t.turn.data(),
                    i = n.pageZoom[t.page];
                e.isDefaultPrevented() || (i && i != n.zoom && (t.turn.trigger("zoomed", [t.page, t.turn.turn("view", t.page), i, n.zoom]), n.pageZoom[t.page] = n.zoom), "single" == n.display && a && ("l" == a.charAt(1) && "ltr" == n.direction || "r" == a.charAt(1) && "rtl" == n.direction ? (t.next = t.next < t.page ? t.next : t.page - 1, t.force = !0) : t.next = t.next > t.page ? t.next : t.page + 1), C._addMotionPage.call(e.target)), C._updateShadow.call(t.turn)
            },
            _eventEnd: function(t, a, n) {
                e(t.target).data();
                var i = (t = a.turn).data();
                n ? ((n = i.tpage || i.page) == a.next || n == a.page) && (delete i.tpage, C._fitPage.call(t, n || a.next, !0)) : (C._removeMv.call(t, a.page), C._updateShadow.call(t), t.turn("update"))
            },
            _eventPressed: function(t) {
                var a = (t = e(t.target).data().f).opts.turn;
                return a.data().mouseAction = !0, a.turn("update"), t.time = (new Date).getTime()
            },
            _eventReleased: function(t, a) {
                var n, i = (n = e(t.target)).data().f,
                    r = i.opts.turn,
                    o = r.data();
                n = "single" == o.display ? "br" == a.corner || "tr" == a.corner ? a.x < n.width() / 2 : a.x > n.width() / 2 : 0 > a.x || a.x > n.width(), (200 > (new Date).getTime() - i.time || n) && (t.preventDefault(), C._turnPage.call(r, i.opts.next)), o.mouseAction = !1
            },
            _flip: function(t) {
                t.stopPropagation(), (t = e(t.target).data().f.opts).turn.trigger("turn", [t.next]), t.turn.data().opts.autoCenter && t.turn.turn("center", t.next)
            },
            _touchStart: function() {
                var e, t = this.data();
                for (e in t.pages)
                    if (s(e, t.pages) && !1 === D._eventStart.apply(t.pages[e], arguments)) return !1
            },
            _touchMove: function() {
                var e, t = this.data();
                for (e in t.pages) s(e, t.pages) && D._eventMove.apply(t.pages[e], arguments)
            },
            _touchEnd: function() {
                var e, t = this.data();
                for (e in t.pages) s(e, t.pages) && D._eventEnd.apply(t.pages[e], arguments)
            },
            calculateZ: function(e) {
                var t, a, n, i, r = this,
                    o = this.data(),
                    s = (t = this.turn("view"))[0] || t[1],
                    l = e.length - 1,
                    c = {
                        pageZ: {},
                        partZ: {},
                        pageV: {}
                    },
                    d = function(e) {
                        (e = r.turn("view", e))[0] && (c.pageV[e[0]] = !0), e[1] && (c.pageV[e[1]] = !0)
                    };
                for (t = 0; t <= l; t++) a = e[t], n = o.pages[a].data().f.opts.next, i = o.pagePlace[a], d(a), d(n), a = o.pagePlace[n] == n ? n : a, c.pageZ[a] = o.totalPages - Math.abs(s - a), c.partZ[i] = 2 * o.totalPages - l + t;
                return c
            },
            update: function() {
                var t, a = this.data();
                if (this.turn("animating") && 0 !== a.pageMv[0]) {
                    var n, i = this.turn("calculateZ", a.pageMv),
                        r = this.turn("corner"),
                        o = this.turn("view"),
                        l = this.turn("view", a.tpage);
                    for (t in a.pageWrap) s(t, a.pageWrap) && (n = a.pageObjs[t].hasClass("fixed"), a.pageWrap[t].css({
                        display: i.pageV[t] || n ? "" : "none",
                        zIndex: (a.pageObjs[t].hasClass("hard") ? i.partZ[t] : i.pageZ[t]) || (n ? -1 : 0)
                    }), n = a.pages[t]) && (n.flip("z", i.partZ[t] || null), i.pageV[t] && n.flip("resize"), a.tpage ? n.flip("hover", !1).flip("disable", -1 == e.inArray(parseInt(t, 10), a.pageMv) && t != l[0] && t != l[1]) : n.flip("hover", !1 === r).flip("disable", t != o[0] && t != o[1]))
                } else
                    for (t in a.pageWrap) s(t, a.pageWrap) && (i = C._setPageLoc.call(this, t), a.pages[t] && a.pages[t].flip("disable", a.disabled || 1 != i).flip("hover", !0).flip("z", null));
                return this
            },
            _updateShadow: function() {
                var t, n, i = this.data(),
                    r = this.width(),
                    o = this.height(),
                    s = "single" == i.display ? r : r / 2;
                t = this.turn("view"), i.shadow || (i.shadow = e("<div />", {
                    class: "shadow",
                    css: a(0, 0, 0).css
                }).appendTo(this));
                for (var l = 0; l < i.pageMv.length && t[0] && t[1]; l++) t = this.turn("view", i.pages[i.pageMv[l]].data().f.opts.next), n = this.turn("view", i.pageMv[l]), t[0] = t[0] && n[0], t[1] = t[1] && n[1];
                switch (t[0] ? t[1] ? 3 : "ltr" == i.direction ? 2 : 1 : "ltr" == i.direction ? 1 : 2) {
                    case 1:
                        i.shadow.css({
                            width: s,
                            height: o,
                            top: 0,
                            left: s
                        });
                        break;
                    case 2:
                        i.shadow.css({
                            width: s,
                            height: o,
                            top: 0,
                            left: 0
                        });
                        break;
                    case 3:
                        i.shadow.css({
                            width: r,
                            height: o,
                            top: 0,
                            left: 0
                        })
                }
            },
            _setPageLoc: function(e) {
                var t = this.data(),
                    a = this.turn("view"),
                    n = 0;
                if (e == a[0] || e == a[1] ? n = 1 : ("single" == t.display && e == a[0] + 1 || "double" == t.display && e == a[0] - 2 || e == a[1] + 2) && (n = 2), !this.turn("animating")) switch (n) {
                    case 1:
                        t.pageWrap[e].css({
                            zIndex: t.totalPages,
                            display: ""
                        });
                        break;
                    case 2:
                        t.pageWrap[e].css({
                            zIndex: t.totalPages - 1,
                            display: ""
                        });
                        break;
                    case 0:
                        t.pageWrap[e].css({
                            zIndex: 0,
                            display: t.pageObjs[e].hasClass("fixed") ? "" : "none"
                        })
                }
                return n
            },
            options: function(t) {
                if (void 0 === t) return this.data().opts;
                var a = this.data();
                if (e.extend(a.opts, t), t.pages && this.turn("pages", t.pages), t.page && this.turn("page", t.page), t.display && this.turn("display", t.display), t.direction && this.turn("direction", t.direction), t.width && t.height && this.turn("size", t.width, t.height), t.when)
                    for (var n in t.when) s(n, t.when) && this.unbind(n).bind(n, t.when[n]);
                return this
            },
            version: function() {
                return "4.1.0"
            }
        },
        D = {
            init: function(e) {
                return this.data({
                    f: {
                        disabled: !1,
                        hover: !1,
                        effect: this.hasClass("hard") ? "hard" : "sheet"
                    }
                }), this.flip("options", e), D._addPageWrapper.call(this), this
            },
            setData: function(t) {
                var a = this.data();
                return a.f = e.extend(a.f, t), this
            },
            options: function(t) {
                var a = this.data().f;
                return t ? (D.setData.call(this, {
                    opts: e.extend({}, a.opts || k, t)
                }), this) : a.opts
            },
            z: function(e) {
                var t = this.data().f;
                return t.opts["z-index"] = e, t.fwrapper && t.fwrapper.css({
                    zIndex: e || parseInt(t.parent.css("z-index"), 10) || 0
                }), this
            },
            _cAllowed: function() {
                var e = this.data().f,
                    t = e.opts.page,
                    a = e.opts.turn.data(),
                    n = t % 2;
                return "hard" == e.effect ? "ltr" == a.direction ? [n ? "r" : "l"] : [n ? "l" : "r"] : "single" == a.display ? 1 == t ? "ltr" == a.direction ? x.forward : x.backward : t == a.totalPages ? "ltr" == a.direction ? x.backward : x.forward : x.all : "ltr" == a.direction ? x[n ? "forward" : "backward"] : x[n ? "backward" : "forward"]
            },
            _cornerActivated: function(t) {
                var a = this.data().f,
                    n = this.width(),
                    i = this.height(),
                    r = (t = {
                        x: t.x,
                        y: t.y,
                        corner: ""
                    }, a.opts.cornerSize);
                if (0 >= t.x || 0 >= t.y || t.x >= n || t.y >= i) return !1;
                var o = D._cAllowed.call(this);
                switch (a.effect) {
                    case "hard":
                        if (t.x > n - r) t.corner = "r";
                        else {
                            if (!(t.x < r)) return !1;
                            t.corner = "l"
                        }
                        break;
                    case "sheet":
                        if (t.y < r) t.corner += "t";
                        else {
                            if (!(t.y >= i - r)) return !1;
                            t.corner += "b"
                        }
                        if (t.x <= r) t.corner += "l";
                        else {
                            if (!(t.x >= n - r)) return !1;
                            t.corner += "r"
                        }
                }
                return !(!t.corner || -1 == e.inArray(t.corner, o)) && t
            },
            _isIArea: function(e) {
                var t = this.data().f.parent.offset();
                e = g && e.originalEvent ? e.originalEvent.touches[0] : e;
                return D._cornerActivated.call(this, {
                    x: e.pageX - t.left,
                    y: e.pageY - t.top
                })
            },
            _c: function(e, t) {
                switch (t = t || 0, e) {
                    case "tl":
                        return i(t, t);
                    case "tr":
                        return i(this.width() - t, t);
                    case "bl":
                        return i(t, this.height() - t);
                    case "br":
                        return i(this.width() - t, this.height() - t);
                    case "l":
                        return i(t, 0);
                    case "r":
                        return i(this.width() - t, 0)
                }
            },
            _c2: function(e) {
                switch (e) {
                    case "tl":
                    case "l":
                        return i(2 * this.width(), 0);
                    case "tr":
                    case "r":
                        return i(-this.width(), 0);
                    case "bl":
                        return i(2 * this.width(), this.height());
                    case "br":
                        return i(-this.width(), this.height())
                }
            },
            _foldingPage: function() {
                var e = this.data().f;
                if (e) {
                    var t = e.opts;
                    if (t.turn) return "single" == (e = t.turn.data()).display ? 1 < t.next || 1 < t.page ? e.pageObjs[0] : null : e.pageObjs[t.next]
                }
            },
            _backGradient: function() {
                var t = this.data().f,
                    n = t.opts.turn.data();
                return (n = n.opts.gradients && ("single" == n.display || 2 != t.opts.page && t.opts.page != n.totalPages - 1)) && !t.bshadow && (t.bshadow = e("<div/>", a(0, 0, 1)).css({
                    position: "",
                    width: this.width(),
                    height: this.height()
                }).appendTo(t.parent)), n
            },
            type: function() {
                return this.data().f.effect
            },
            resize: function(e) {
                var t = this.data().f,
                    a = t.opts.turn.data(),
                    n = this.width(),
                    i = this.height();
                switch (t.effect) {
                    case "hard":
                        e && (t.wrapper.css({
                            width: n,
                            height: i
                        }), t.fpage.css({
                            width: n,
                            height: i
                        }), a.opts.gradients && (t.ashadow.css({
                            width: n,
                            height: i
                        }), t.bshadow.css({
                            width: n,
                            height: i
                        })));
                        break;
                    case "sheet":
                        e && (e = Math.round(Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2))), t.wrapper.css({
                            width: e,
                            height: e
                        }), t.fwrapper.css({
                            width: e,
                            height: e
                        }).children(":first-child").css({
                            width: n,
                            height: i
                        }), t.fpage.css({
                            width: n,
                            height: i
                        }), a.opts.gradients && t.ashadow.css({
                            width: n,
                            height: i
                        }), D._backGradient.call(this) && t.bshadow.css({
                            width: n,
                            height: i
                        })), t.parent.is(":visible") && (a = p(t.parent[0]), t.fwrapper.css({
                            top: a.top,
                            left: a.left
                        }), a = p(t.opts.turn[0]), t.fparent.css({
                            top: -a.top,
                            left: -a.left
                        })), this.flip("z", t.opts["z-index"])
                }
            },
            _addPageWrapper: function() {
                var t = this.data().f,
                    n = t.opts.turn.data(),
                    i = this.parent();
                if (t.parent = i, !t.wrapper) switch (t.effect) {
                    case "hard":
                        (r = {})[f + "transform-style"] = "preserve-3d", r[f + "backface-visibility"] = "hidden", t.wrapper = e("<div/>", a(0, 0, 2)).css(r).appendTo(i).prepend(this), t.fpage = e("<div/>", a(0, 0, 1)).css(r).appendTo(i), n.opts.gradients && (t.ashadow = e("<div/>", a(0, 0, 0)).hide().appendTo(i), t.bshadow = e("<div/>", a(0, 0, 0)));
                        break;
                    case "sheet":
                        var r = this.width(),
                            o = this.height();
                        Math.round(Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2))), t.fparent = t.opts.turn.data().fparent, t.fparent || ((r = e("<div/>", {
                            css: {
                                "pointer-events": "none"
                            }
                        }).hide()).data().flips = 0, r.css(a(0, 0, "auto", "visible").css).appendTo(t.opts.turn), t.opts.turn.data().fparent = r, t.fparent = r), this.css({
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: "auto",
                            right: "auto"
                        }), t.wrapper = e("<div/>", a(0, 0, this.css("z-index"))).appendTo(i).prepend(this), t.fwrapper = e("<div/>", a(i.offset().top, i.offset().left)).hide().appendTo(t.fparent), t.fpage = e("<div/>", a(0, 0, 0, "visible")).css({
                            cursor: "default"
                        }).appendTo(t.fwrapper), n.opts.gradients && (t.ashadow = e("<div/>", a(0, 0, 1)).appendTo(t.fpage)), D.setData.call(this, t)
                }
                D.resize.call(this, !0)
            },
            _fold: function(e) {
                var t = this.data().f,
                    a = t.opts.turn.data(),
                    n = D._c.call(this, e.corner),
                    s = this.width(),
                    l = this.height();
                switch (t.effect) {
                    case "hard":
                        e.x = "l" == e.corner ? Math.min(Math.max(e.x, 0), 2 * s) : Math.max(Math.min(e.x, s), -s);
                        var d, _, p, h, g, y = a.totalPages,
                            x = t.opts["z-index"] || y,
                            b = {
                                overflow: "visible"
                            },
                            w = n.x ? (n.x - e.x) / s : e.x / s,
                            $ = 90 * w,
                            k = 90 > $;
                        switch (e.corner) {
                            case "l":
                                h = "0% 50%", g = "100% 50%", k ? (d = 0, _ = 0 < t.opts.next - 1, p = 1) : (d = "100%", _ = t.opts.page + 1 < y, p = 0);
                                break;
                            case "r":
                                h = "100% 50%", g = "0% 50%", $ = -$, s = -s, k ? (d = 0, _ = t.opts.next + 1 < y, p = 0) : (d = "-100%", _ = 1 != t.opts.page, p = 1)
                        }
                        b[f + "perspective-origin"] = g, t.wrapper.transform("rotateY(" + $ + "deg)translate3d(0px, 0px, " + (this.attr("depth") || 0) + "px)", g), t.fpage.transform("translateX(" + s + "px) rotateY(" + (180 + $) + "deg)", h), t.parent.css(b), k ? (w = 1 - w, t.wrapper.css({
                            zIndex: x + 1
                        }), t.fpage.css({
                            zIndex: x
                        })) : (w -= 1, t.wrapper.css({
                            zIndex: x
                        }), t.fpage.css({
                            zIndex: x + 1
                        })), a.opts.gradients && (_ ? t.ashadow.css({
                            display: "",
                            left: d,
                            backgroundColor: "rgba(0,0,0," + .5 * w + ")"
                        }).transform("rotateY(0deg)") : t.ashadow.hide(), t.bshadow.css({
                            opacity: 1 - w
                        }), k ? t.bshadow.parent()[0] != t.wrapper[0] && t.bshadow.appendTo(t.wrapper) : t.bshadow.parent()[0] != t.fpage[0] && t.bshadow.appendTo(t.fpage), c(t.bshadow, i(100 * p, 0), i(100 * (1 - p), 0), [
                            [0, "rgba(0,0,0,0.3)"],
                            [1, "rgba(0,0,0,0)"]
                        ], 2));
                        break;
                    case "sheet":
                        var C, M, T, I, z, S, P, U = this,
                            j = 0,
                            A = i(0, 0),
                            E = i(0, 0),
                            O = i(0, 0),
                            F = D._foldingPage.call(this);
                        Math.tan(0);
                        var W = a.opts.acceleration,
                            H = t.wrapper.height(),
                            N = "t" == e.corner.substr(0, 1),
                            R = "l" == e.corner.substr(1, 1),
                            V = function() {
                                var t = i(0, 0),
                                    r = i(0, 0);
                                t.x = n.x ? n.x - e.x : e.x, t.y = u ? n.y ? n.y - e.y : e.y : 0, r.x = R ? s - t.x / 2 : e.x + t.x / 2, r.y = t.y / 2;
                                var o = m - Math.atan2(t.y, t.x),
                                    c = o - Math.atan2(r.y, r.x);
                                c = Math.max(0, Math.sin(c) * Math.sqrt(Math.pow(r.x, 2) + Math.pow(r.y, 2)));
                                return j = o / v * 180, O = i(c * Math.sin(o), c * Math.cos(o)), o > m && (O.x += Math.abs(O.y * t.y / t.x), O.y = 0, Math.round(O.x * Math.tan(v - o)) < l) ? (e.y = Math.sqrt(Math.pow(l, 2) + 2 * r.x * t.x), N && (e.y = l - e.y), V()) : (o > m && (t = v - o, r = H - l / Math.sin(t), A = i(Math.round(r * Math.cos(t)), Math.round(r * Math.sin(t))), R && (A.x = -A.x), N && (A.y = -A.y)), C = Math.round(O.y / Math.tan(o) + O.x), r = (t = s - C) * Math.cos(2 * o), c = t * Math.sin(2 * o), E = i(Math.round(R ? t - r : C + r), Math.round(N ? c : l - c)), a.opts.gradients && (z = t * Math.sin(o), t = D._c2.call(U, e.corner), t = Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) / s, P = Math.sin(m * (1 < t ? 2 - t : t)), S = Math.min(t, 1), I = 100 < z ? (z - 100) / z : 0, M = i(z * Math.sin(o) / s * 100, z * Math.cos(o) / l * 100), D._backGradient.call(U) && (T = i(1.2 * z * Math.sin(o) / s * 100, 1.2 * z * Math.cos(o) / l * 100), R || (T.x = 100 - T.x), N || (T.y = 100 - T.y))), O.x = Math.round(O.x), O.y = Math.round(O.y), !0)
                            };
                        switch (d = function(e, n, d, _) {
                                var p = ["0", "auto"],
                                    h = (s - H) * d[0] / 100,
                                    u = (l - H) * d[1] / 100,
                                    f = (n = {
                                        left: p[n[0]],
                                        top: p[n[1]],
                                        right: p[n[2]],
                                        bottom: p[n[3]]
                                    }, p = {}, 90 != _ && -90 != _ ? R ? -1 : 1 : 0),
                                    v = d[0] + "% " + d[1] + "%";
                                U.css(n).transform(o(_) + r(e.x + f, e.y, W), v), t.fpage.css(n).transform(o(_) + r(e.x + E.x - A.x - s * d[0] / 100, e.y + E.y - A.y - l * d[1] / 100, W) + o((180 / _ - 2) * _), v), t.wrapper.transform(r(-e.x + h - f, -e.y + u, W) + o(-_), v), t.fwrapper.transform(r(-e.x + A.x + h, -e.y + A.y + u, W) + o(-_), v), a.opts.gradients && (d[0] && (M.x = 100 - M.x), d[1] && (M.y = 100 - M.y), p["box-shadow"] = "0 0 20px rgba(0,0,0," + .5 * P + ")", F.css(p), c(t.ashadow, i(R ? 100 : 0, N ? 0 : 100), i(M.x, M.y), [
                                    [I, "rgba(0,0,0,0)"],
                                    [.8 * (1 - I) + I, "rgba(0,0,0," + .2 * S + ")"],
                                    [1, "rgba(255,255,255," + .2 * S + ")"]
                                ], 3, 0), D._backGradient.call(U) && c(t.bshadow, i(R ? 0 : 100, N ? 0 : 100), i(T.x, T.y), [
                                    [.6, "rgba(0,0,0,0)"],
                                    [.8, "rgba(0,0,0," + .3 * S + ")"],
                                    [1, "rgba(0,0,0,0)"]
                                ], 3))
                            }, e.corner) {
                            case "tl":
                                e.x = Math.max(e.x, 1), V(), d(O, [1, 0, 0, 1], [100, 0], j);
                                break;
                            case "tr":
                                e.x = Math.min(e.x, s - 1), V(), d(i(-O.x, O.y), [0, 0, 0, 1], [0, 0], -j);
                                break;
                            case "bl":
                                e.x = Math.max(e.x, 1), V(), d(i(O.x, -O.y), [1, 1, 0, 0], [100, 100], -j);
                                break;
                            case "br":
                                e.x = Math.min(e.x, s - 1), V(), d(i(-O.x, -O.y), [0, 1, 1, 0], [0, 100], j)
                        }
                }
                t.point = e
            },
            _moveFoldingPage: function(e) {
                var t = this.data().f;
                if (t) {
                    var a = t.opts.turn,
                        n = a.data(),
                        i = n.pagePlace;
                    e ? (i[n = t.opts.next] != t.opts.page && (t.folding && D._moveFoldingPage.call(this, !1), D._foldingPage.call(this).appendTo(t.fpage), i[n] = t.opts.page, t.folding = n), a.turn("update")) : t.folding && (n.pages[t.folding] ? (a = n.pages[t.folding].data().f, n.pageObjs[t.folding].appendTo(a.wrapper)) : n.pageWrap[t.folding] && n.pageObjs[t.folding].appendTo(n.pageWrap[t.folding]), t.folding in i && (i[t.folding] = t.folding), delete t.folding)
                }
            },
            _showFoldedPage: function(e, t) {
                var a = D._foldingPage.call(this),
                    n = (o = this.data()).f,
                    i = n.visible;
                if (a) {
                    if (!(i && n.point && n.point.corner == e.corner || (a = "hover" == n.status || "peel" == n.status || n.opts.turn.data().mouseAction ? e.corner : null, i = !1, "prevented" != d("start", this, [n.opts, a])))) return !1;
                    if (t) {
                        var r = this,
                            o = n.point && n.point.corner == e.corner ? n.point : D._c.call(this, e.corner, 1);
                        this.animatef({
                            from: [o.x, o.y],
                            to: [e.x, e.y],
                            duration: 500,
                            frame: function(t) {
                                e.x = Math.round(t[0]), e.y = Math.round(t[1]), D._fold.call(r, e)
                            }
                        })
                    } else D._fold.call(this, e), o.effect && !o.effect.turning && this.animatef(!1);
                    if (!i) switch (n.effect) {
                        case "hard":
                            n.visible = !0, D._moveFoldingPage.call(this, !0), n.fpage.show(), n.opts.shadows && n.bshadow.show();
                            break;
                        case "sheet":
                            n.visible = !0, n.fparent.show().data().flips++, D._moveFoldingPage.call(this, !0), n.fwrapper.show(), n.bshadow && n.bshadow.show()
                    }
                    return !0
                }
                return !1
            },
            hide: function() {
                var e = this.data().f,
                    t = e.opts.turn.data(),
                    a = D._foldingPage.call(this);
                switch (e.effect) {
                    case "hard":
                        t.opts.gradients && (e.bshadowLoc = 0, e.bshadow.remove(), e.ashadow.hide()), e.wrapper.transform(""), e.fpage.hide();
                        break;
                    case "sheet":
                        0 == --e.fparent.data().flips && e.fparent.hide(), this.css({
                            left: 0,
                            top: 0,
                            right: "auto",
                            bottom: "auto"
                        }).transform(""), e.wrapper.transform(""), e.fwrapper.hide(), e.bshadow && e.bshadow.hide(), a.transform("")
                }
                return e.visible = !1, this
            },
            hideFoldedPage: function(e) {
                var t = this.data().f;
                if (t.point) {
                    var a = this,
                        r = t.point,
                        o = function() {
                            t.point = null, t.status = "", a.flip("hide"), a.trigger("end", [t.opts, !1])
                        };
                    if (e) {
                        var s = D._c.call(this, r.corner),
                            l = (e = "t" == r.corner.substr(0, 1) ? Math.min(0, r.y - s.y) / 2 : Math.max(0, r.y - s.y) / 2, i(r.x, r.y + e)),
                            c = i(s.x, s.y - e);
                        this.animatef({
                            from: 0,
                            to: 1,
                            frame: function(e) {
                                e = n(r, l, c, s, e), r.x = e.x, r.y = e.y, D._fold.call(a, r)
                            },
                            complete: o,
                            duration: 800,
                            hiding: !0
                        })
                    } else this.animatef(!1), o()
                }
            },
            turnPage: function(e) {
                var t = this,
                    a = this.data().f,
                    i = a.opts.turn.data(),
                    r = (e = {
                        corner: a.corner ? a.corner.corner : e || D._cAllowed.call(this)[0]
                    }, a.point || D._c.call(this, e.corner, a.opts.turn ? i.opts.elevation : 0)),
                    o = D._c2.call(this, e.corner);
                this.trigger("flip").animatef({
                    from: 0,
                    to: 1,
                    frame: function(a) {
                        a = n(r, r, o, o, a), e.x = a.x, e.y = a.y, D._showFoldedPage.call(t, e)
                    },
                    complete: function() {
                        t.trigger("end", [a.opts, !0])
                    },
                    duration: i.opts.duration,
                    turning: !0
                }), a.corner = null
            },
            moving: function() {
                return "effect" in this.data()
            },
            isTurning: function() {
                return this.flip("moving") && this.data().effect.turning
            },
            corner: function() {
                return this.data().f.corner
            },
            _eventStart: function(e) {
                var t = this.data().f,
                    a = t.opts.turn;
                if (!t.corner && !t.disabled && !this.flip("isTurning") && t.opts.page == a.data().pagePlace[t.opts.page]) {
                    if (t.corner = D._isIArea.call(this, e), t.corner && D._foldingPage.call(this)) return this.trigger("pressed", [t.point]), D._showFoldedPage.call(this, t.corner), !1;
                    t.corner = null
                }
            },
            _eventMove: function(e) {
                var t = this.data().f;
                if (!t.disabled)
                    if (e = g ? e.originalEvent.touches : [e], t.corner) {
                        var a = t.parent.offset();
                        t.corner.x = e[0].pageX - a.left, t.corner.y = e[0].pageY - a.top, D._showFoldedPage.call(this, t.corner)
                    } else t.hover && !this.data().effect && this.is(":visible") && ((e = D._isIArea.call(this, e[0])) ? ("sheet" == t.effect && 2 == e.corner.length || "hard" == t.effect) && (t.status = "hover", t = D._c.call(this, e.corner, t.opts.cornerSize / 2), e.x = t.x, e.y = t.y, D._showFoldedPage.call(this, e, !0)) : "hover" == t.status && (t.status = "", D.hideFoldedPage.call(this, !0)))
            },
            _eventEnd: function() {
                var e = this.data().f,
                    t = e.corner;
                !e.disabled && t && "prevented" != d("released", this, [e.point || t]) && D.hideFoldedPage.call(this, !0), e.corner = null
            },
            disable: function(e) {
                return D.setData.call(this, {
                    disabled: e
                }), this
            },
            hover: function(e) {
                return D.setData.call(this, {
                    hover: e
                }), this
            },
            peel: function(t, a) {
                var n = this.data().f;
                if (t) {
                    if (-1 == e.inArray(t, x.all)) throw _("Corner " + t + " is not permitted");
                    if (-1 != e.inArray(t, D._cAllowed.call(this))) {
                        var i = D._c.call(this, t, n.opts.cornerSize / 2);
                        n.status = "peel", D._showFoldedPage.call(this, {
                            corner: t,
                            x: i.x,
                            y: i.y
                        }, a)
                    }
                } else n.status = "", D.hideFoldedPage.call(this, a);
                return this
            }
        };
    window.requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }, e.extend(e.fn, {
        flip: function() {
            return t(e(this[0]), D, arguments)
        },
        turn: function() {
            return t(e(this[0]), C, arguments)
        },
        transform: function(e, t) {
            var a = {};
            return t && (a[f + "transform-origin"] = t), a[f + "transform"] = e, this.css(a)
        },
        animatef: function(t) {
            var a = this.data();
            if (a.effect && a.effect.stop(), t) {
                t.to.length || (t.to = [t.to]), t.from.length || (t.from = [t.from]);
                for (var n = [], i = t.to.length, r = !0, o = this, s = (new Date).getTime(), l = function() {
                        if (a.effect && r) {
                            for (var e = [], c = Math.min(t.duration, (new Date).getTime() - s), d = 0; d < i; d++) e.push(a.effect.easing(1, c, t.from[d], n[d], t.duration));
                            t.frame(1 == i ? e[0] : e), c == t.duration ? (delete a.effect, o.data(a), t.complete && t.complete()) : window.requestAnim(l)
                        }
                    }, c = 0; c < i; c++) n.push(t.to[c] - t.from[c]);
                a.effect = e.extend({
                    stop: function() {
                        r = !1
                    },
                    easing: function(e, t, a, n, i) {
                        return n * Math.sqrt(1 - (t = t / i - 1) * t) + a
                    }
                }, t), this.data(a), l()
            } else delete a.effect
        }
    }), e.isTouch = g, e.mouseEvents = y, e.cssPrefix = l, e.cssTransitionEnd = function() {
        var e, t = document.createElement("fakeelement"),
            a = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MSTransition: "transitionend",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
        for (e in a)
            if (void 0 !== t.style[e]) return a[e]
    }, e.findPos = p
}(jQuery);
var JqueryDraggableZoomHack = function() {
        var e = {
                x: 0,
                y: 0
            },
            t = {
                dragStartWithScalingSupport: function(t) {
                    e.x = t.clientX, e.y = t.clientY
                },
                dragWithScalingSupport: function(t, a, n) {
                    var i = (n = n || {}).transform_scale || 1,
                        r = n.boundary || {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        };
                    const o = a.originalPosition;
                    var s = (t.clientX - e.x + o.left) / i,
                        l = (t.clientY - e.y + o.top) / i;
                    const c = $(a.helper).height(),
                        d = $(a.helper).width();
                    s < r.x1 ? s = r.x1 : s + d > r.x2 && (s = r.x2 - d), l < r.y1 ? l = r.y1 : l + c > r.y2 && (l = r.y2 - c), a.position = {
                        left: s,
                        top: l
                    }
                }
            };
        return t
    }(),
    BoundaryDetection = function() {
        var e = 440,
            t = 550,
            a = {
                isRectanglesOverlapping: function(e, t) {
                    return e.x1 < t.x2 && e.x2 > t.x1 && e.y1 < t.y2 && e.y2 > t.y1
                },
                findNextEmptySpace: function(n, i, r) {
                    for (var o = 0, s = 0, l = 35, c = 50; s + i < t;) {
                        for (; o + n < e;) {
                            var d, _ = {
                                    x1: o,
                                    y1: s,
                                    x2: o + n,
                                    y2: s + i
                                },
                                p = !0;
                            for (d = 0; d < r.length; d += 1) {
                                if (a.isRectanglesOverlapping(_, r[d])) {
                                    p = !1;
                                    break
                                }
                            }
                            if (p) return [o, s];
                            o += l
                        }
                        o = 0, s += c
                    }
                },
                isRectangleRunoff: function(a) {
                    return a.x1 < 0 || a.y1 < 0 || a.x2 > e || a.y2 > t
                }
            };
        return a
    }(),
    PaymentCheckoutHelper = function() {
        function e(e, t) {
            null !== t && e && "undefined" != typeof gtag && gtag("event", "click", {
                event_category: "stripe",
                event_action: "clicked choose " + t
            })
        }
        let t = {
            triggerStripeButton: ({
                is_production: t,
                google_recaptcha_token: a,
                plan_name: n,
                canvas_key: i,
                current_url: r,
                stripe: o,
                stripe_payment_currency: s,
                stripe_tax_code_name: l,
                is_use_stripe_tax_rates: c,
                callback: d
            }) => {
                const _ = {
                    current_url: r,
                    google_recaptcha_token: a
                };
                if (n && !i) _.product_name = n + " Plan", e(t, n);
                else {
                    if (n || !i) throw new Error("There should either be a plan_name or canvas_key, but not both.");
                    _.canvas_key = i, t && "undefined" != typeof gtag && gtag("event", "click", {
                        event_category: "stripe",
                        event_action: "clicked single card buy now button"
                    })
                }
                "" !== s && (_.payment_currency = s), "" !== l && (_.stripe_tax_code_name = l), "" !== c && (_.is_use_stripe_tax_rates = c), $.ajax({
                    method: "POST",
                    data: _,
                    url: "/pricing/stripe_create_checkout_session"
                }).done((function(e) {
                    if ("success" === e.status) {
                        "function" == typeof d && d();
                        let t = e.data.stripe_checkout_session_id;
                        return o.redirectToCheckout({
                            sessionId: t
                        })
                    }
                }))
            },
            setUpStripe: function({
                $stripe_checkout_buttons: e,
                user_id: t,
                stripe_public_key: a,
                stripe_payment_currency: n,
                stripe_tax_code_name: i,
                is_use_stripe_tax_rates: r,
                is_a_team_member: o,
                canvas_key: s,
                is_google_recaptcha_enabled: l,
                google_recaptcha_site_key: c,
                is_production: d
            }) {
                function _() {
                    e.prop("disabled", !1), $.unblockUI()
                }
                let p = t,
                    h = !1;
                e.click((function(t) {
                    t.preventDefault();
                    const u = $(this);
                    if (u.data("plan-name") || s)
                        if (null === p) {
                            let e = function(e) {
                                p = e.user_id, u.click()
                            };
                            bind_signin_events(e), bind_signup_events(e);
                            let t = document.getElementsByName("csrf-token")[0].content,
                                a = ["google_oauth_sign_in_button_container", "google_oauth_sign_up_button_container"];
                            GoogleOauthHelper.init(a, t, e, $(".google_auth_validation_message_container")), $("#sign_up_modal").modal("show")
                        } else {
                            const t = Stripe(a),
                                p = {
                                    current_url: window.location.href,
                                    stripe: t,
                                    stripe_payment_currency: n,
                                    stripe_tax_code_name: i,
                                    is_use_stripe_tax_rates: r,
                                    callback: _
                                },
                                f = $("#pricing_currency_dropdown");
                            f.length && (p.stripe_payment_currency = f.val());
                            const v = $(this).data("plan-name");
                            if (v) {
                                if (o && !h) return $("#is_already_member_warning_modal").modal("show"), void $("#continue_purchase_plan").on("click", (function() {
                                    h = !0, u.click()
                                }));
                                p.plan_name = v
                            } else p.canvas_key = s;
                            l ? grecaptcha.ready((function() {
                                grecaptcha.execute(c, {
                                    action: "submit"
                                }).then((function(t) {
                                    e.prop("disabled", !0), $.blockUI(blockUILoadingConfig), p.google_recaptcha_token = t, PaymentCheckoutHelper.triggerStripeButton(p)
                                }))
                            })) : (e.prop("disabled", !0), $.blockUI(blockUILoadingConfig), p.google_recaptcha_token = null, p.is_production = d, PaymentCheckoutHelper.triggerStripeButton(p))
                        }
                    else window.location.href = "/pricing"
                }))
            }
        };
        return t
    }(),
    StringHelper = function() {
        var e = {
            parametizeString: function(e) {
                return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            }
        };
        return e
    }();
const UserHelper = function() {
    const e = {
        getNameInitials: function(e) {
            let t = "",
                a = e.match(/\b(\w)/g);
            return null !== a && (t = a.slice(0, 2).join("").toUpperCase()), t
        },
        getRandomAvatarBackgroundColor: function() {
            const e = ["danger", "primary", "secondary", "info", "success", "warning"];
            return e[Math.floor(Math.random() * e.length)]
        },
        getRandomColors: function() {
            const e = ["danger", "primary", "secondary", "info", "success", "warning"],
                t = e[Math.floor(Math.random() * e.length)];
            return {
                background_color: t,
                text_color: "secondary" === t ? "text-dark" : "text-white"
            }
        },
        renderUserListHTML: function(e) {
            let t = "";
            return e.forEach((function(e) {
                const a = UserHelper.getNameInitials(e),
                    {
                        text_color: n,
                        background_color: i
                    } = UserHelper.getRandomColors();
                t += `\n          <li class="list-group-item text-truncate">\n            <span class="avatar bg-${i} ${n} rounded-circle avatar-sm mr-3">\n              ${a}\n            </span>\n            ${e}\n          </li>\n        `
            })), t
        }
    };
    return e
}();