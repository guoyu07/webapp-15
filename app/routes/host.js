import Ember from 'ember';
import truncate from 'webapp/helpers/truncate';

export default Ember.Route.extend({
  titleToken(model) {
    return model.get('displayedFarmName');
  },

  headTags() {
    let model = this.modelFor(this.routeName);

    // Truncate description and remove extra spaces
    let description = truncate.compute([model.get('fullDescription')], { limit: 200 }) || '';
    description = description.replace(/\s+/g, ' ');

    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: description
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-description',
        attrs: {
          name: 'og:description',
          content: description
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-image',
        attrs: {
          name: 'og:image',
          content: model.get('thumbnail.completeUrl')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-url',
        attrs: {
          name: 'og:url',
          content: window.location.href
        }
      },
      {
        type: 'meta',
        tagId: 'meta-fb-app-id',
        attrs: {
          name: 'fb:app_id',
          content: '591228884365436'
        }
      }
    ];
  }
});
