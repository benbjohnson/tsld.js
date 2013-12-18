
"use strict";
/*jslint browser: true, nomen: true*/
/*global $, define, d3, playback*/

var PAD = 5;

function Layout(selector) {
    playback.Layout.call(this);
    this.selector = selector;
    this.prevTitle = this.prevSubtitle = "";
    this.padding = {
        top: 70,
        bottom: 160,
        left: 0,
        right: 0,
    };
    this.containerClass = "container";
}

Layout.prototype = new playback.Layout();

/**
 * Initializes the layout.
 */
Layout.prototype.initialize = function () {
    var self = this;
    this.container = $(this.selector);
    this.svg = d3.select(this.selector).append("svg").attr("class", "tsld");
    this.g = this.svg.append("g").attr("class", "tsld");
    this.titleContainer = d3.select(this.selector).append("div").attr("class", "tsld title-container " + this.containerClass).style("display", "none");
    this.subtitleContainer = d3.select(this.selector).append("div").attr("class", "tsld subtitle-container " + this.containerClass);

    this.scales = {
        x: d3.scale.linear(),
        y: d3.scale.linear(),
        w: d3.scale.linear(),
        h: d3.scale.linear(),
        r: function (v) { return Math.min(self.scales.w(v), self.scales.h(v)); },
        font: function (v) { return Math.min(self.scales.font.x(v), self.scales.font.y(v)); },
        size: function (v) { return Math.min(self.scales.w(v), self.scales.h(v)); },
    };
    this.scales.font.x = d3.scale.linear();
    this.scales.font.y = d3.scale.linear();

    this.invalidateSize();
};

/**
 * Redraws the entire model.
 */
Layout.prototype.invalidate = function () {
    var zoom,
        model = this.model(),
        width = this.container.width(),
        height = $(window).height() - this.padding.top - this.padding.bottom,
        viewport = {
            width: width - (PAD * 2),
            height: height - (PAD * 2),
        };

    this.svg.attr("width", width).attr("height", height);
    this.g.attr("transform", "translate(" + PAD + "," + PAD + ")");

    if (model) {
        zoom = {
            x: ((model.domains.x[1] - model.domains.x[0]) / 100),
            y: ((model.domains.y[1] - model.domains.y[0]) / 100),
        };
        this.scales.x.domain(model.domains.x).range([0, viewport.width]);
        this.scales.y.domain(model.domains.y).range([0, viewport.height]);
        this.scales.w.domain([0, model.domains.x[1] - model.domains.x[0]]).range([0, viewport.width]);
        this.scales.h.domain([0, model.domains.y[1] - model.domains.y[0]]).range([0, viewport.height]);
        this.scales.font.x.domain([0, 100 * zoom.x]).range([0, viewport.width * 0.35]);
        this.scales.font.y.domain([0, 100 * zoom.y]).range([0, viewport.height * 0.4]);

        this.invalidateTitle();
        this.invalidateSubtitle();
    }
};

/**
 * Redraws the title.
 */
Layout.prototype.invalidateTitle = function () {
    var titleHTML, titleHeight,
        self = this,
        pct = 0.4,
        viewportHeight = $(window).height() - this.padding.top - this.padding.bottom,
        top = (this.padding.top + (viewportHeight * pct)),
        title = this.model().title,
        html = '<div class="title">' + title + '</div>';

    if (this.prevTitle !== title) {
        if (this.prevTitle === "" && title !== "") {
            // Fade title in.
            this.titleContainer.style("display", "block");
            this.titleContainer.html(html);
            this.fadeIn($(this.titleContainer[0][0]));
        } else if (this.prevTitle !== "" && title === "") {
            // Fade title out.
            this.fadeOut($(this.titleContainer[0][0]), function () {
                self.titleContainer.html(html);
                self.titleContainer.style("display", "none");
            });
        } else {
            // Update title.
            this.titleContainer.html(html);
        }

        this.prevTitle = title;
    }

    titleHTML = this.titleContainer.select(".title");
    titleHTML.style("top", (top - ($(titleHTML[0][0]).height() / 2)) + "px");
};

/**
 * Redraws the subtitle.
 */
Layout.prototype.invalidateSubtitle = function () {
    var self = this,
        text = this.model().subtitle,
        html = '<div class="subtitle">' + text + '</div>';

    if (this.prevSubtitle !== text) {
        if (this.prevSubtitle === "" && text !== "") {
            // Fade in.
            this.subtitleContainer.style("display", "block");
            this.subtitleContainer.html(html);
            this.fadeIn($(this.subtitleContainer[0][0]));
        } else if (this.prevSubtitle !== "" && text === "") {
            // Fade out.
            this.fadeOut($(this.subtitleContainer[0][0]));
        } else {
            // Update subtitle.
            this.subtitleContainer.html(html);
        }

        this.prevSubtitle = text;
    }
};

/**
 * Adjusts the size of the layout and adjusts the scales.
 */
Layout.prototype.invalidateSize = function () {
    if (this.model()) {
        this.invalidate();
    }
};

/**
 * A helper function to fade in an element.
 */
Layout.prototype.fadeIn = function (el) {
    return el.css('visibility', 'visible').hide().fadeIn(600);
};

/**
 * A helper function to fade out an element.
 */
Layout.prototype.fadeOut = function (el, complete) {
    return el.css('visibility', 'hidden').fadeOut(600, complete);
};

module.exports = Layout;
