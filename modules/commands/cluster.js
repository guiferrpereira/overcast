var colors = require('colors');
var _ = require('lodash');
var utils = require('../utils');
var filters = require('../filters');

var commands = {};
exports.commands = commands;

commands.count = {
  name: 'count',
  usage: 'overcast cluster count [name]',
  description: 'Return the number of instances in a cluster.',
  examples: [
    '$ overcast cluster count db',
    '> 0',
    '$ overcast instance create db.01 --cluster db',
    '> ...',
    '$ overcast cluster count db',
    '> 1'
  ],
  required: [{ name: 'name', filters: filters.findMatchingCluster }],
  run: function (args) {
    console.log(_.keys(args.cluster.instances).length);
  }
};

commands.create = {
  name: 'create',
  usage: 'overcast cluster create [name]',
  description: 'Creates a new cluster.',
  examples: '$ overcast cluster create db',
  required: [{ name: 'name', filters: filters.shouldBeNewCluster }],
  run: function (args) {
    var clusters = utils.getClusters();
    clusters[args.name] = { instances: {} };

    utils.saveClusters(clusters, function () {
      utils.success('Cluster "' + args.name + '" has been created.');
    });
  }
};

commands.rename = {
  name: 'rename',
  usage: 'overcast cluster rename [name] [new-name]',
  description: 'Renames a cluster.',
  examples: '$ overcast cluster rename app-cluster app-cluster-renamed',
  required: [
    { name: 'name', filters: filters.findMatchingCluster },
    { name: 'new-name', varName: 'newName', filters: filters.shouldBeNewCluster }
  ],
  run: function (args) {
    var clusters = utils.getClusters();

    clusters[args.newName] = clusters[args.name];
    delete clusters[args.name];

    utils.saveClusters(clusters, function () {
      utils.success('Cluster "' + args.name + '" has been renamed to "' + args.newName + '".');
    });
  }
};

commands.remove = {
  name: 'remove',
  usage: 'overcast cluster remove [name]',
  description: [
    'Removes a cluster from the index. If the cluster has any instances',
    'attached to it, they will be moved to the "orphaned" cluster.'
  ],
  examples: '$ overcast cluster remove db',
  required: [
    { name: 'name', filters: filters.findMatchingCluster }
  ],
  run: function (args) {
    var clusters = utils.getClusters();

    var orphaned = 0;
    if (!_.isEmpty(clusters[args.name].instances)) {
      orphaned = _.keys(clusters[args.name].instances).length;
      clusters.orphaned = clusters.orphaned || { instances: {} };
      _.extend(clusters.orphaned.instances, clusters[args.name].instances);
    }

    delete clusters[args.name];

    utils.saveClusters(clusters, function () {
      utils.success('Cluster "' + args.name + '" has been removed.');
      if (orphaned) {
        if (args.name === 'orphaned') {
          utils.alert('The ' + orphaned + ' instance(s) in the "orphaned" cluster were removed.');
        } else {
          utils.alert('The ' + orphaned + ' instance(s) from this cluster were moved to the "orphaned" cluster.');
        }
      }
    });
  }
};
