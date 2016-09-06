/**
 * @file
 * Defines Javascript behaviors for paragraphs_collapse.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Behaviors for time elements
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Handles time ago for time elements.
   */
  Drupal.behaviors.paragraphs_collapse = {
    attach: function (context) {
      var $context = $(context);

      // Add event handlers to all the collapsible paragraphs.
      $('.field--widget-entity-reference-paragraphs .paragraph-collapsible')
        .once('paragraph-collapsible')
        // Start all the paragraphs off as collapsed.
        .addClass('paragraph-collapsed')
        // Toggle a paragraph when you click the type title.
        .on('click', '.paragraph-type-title', function (event) {
          $(this).closest('.paragraph-collapsible').toggleClass('paragraph-collapsed');
          event.stopPropagation();
        })
        // Uncollapse a paragraph when you click in its form.
        .on('click', '.paragraphs-subform', function (event) {
          $(this).closest('.paragraph-collapsible').removeClass('paragraph-collapsed');
        })
        ;

      // Add collapse all and expand all links next to the show row weights.
      $('.field--widget-entity-reference-paragraphs .tabledrag-toggle-weight-wrapper')
        // Only add links to draggable table children that contain paragraphs.
        .filter(function () {
          return $(this).closest('.form-wrapper').hasClass('field--widget-entity-reference-paragraphs');
        })
        .prepend(
          "<button class='link paragraphs-collapse-all'>Collapse all</button> - " +
          "<button class='link paragraphs-expand-all'>Expand all</button> - "
        );
      // Add event handlers to the collapse all links.
      $('.paragraphs-collapse-all')
        .once('paragraphs-collapse-all')
        .click(function (event) {
          // Only collapse paragraphs below the current field.
          var context = $(this).closest('.field--widget-entity-reference-paragraphs');
          $('.paragraph-collapsible', context).addClass('paragraph-collapsed');
          event.preventDefault();
        });
      // Add event handlers to the expand all links.
      $('.paragraphs-expand-all')
        .once('paragraphs-expand-all')
        .click(function (event) {
          // Only expand paragraphs below the current field.
          var context = $(this).closest('.field--widget-entity-reference-paragraphs');
          $('.paragraph-collapsible', context).removeClass('paragraph-collapsed');
          event.preventDefault();
        });
    }
  };

})(jQuery, Drupal, drupalSettings);
