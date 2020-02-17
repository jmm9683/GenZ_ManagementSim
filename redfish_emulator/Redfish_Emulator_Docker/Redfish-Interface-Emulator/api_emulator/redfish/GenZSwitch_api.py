# Copyright Notice:
# Copyright 2017-2019 DMTF. All rights reserved.
# License: BSD 3-Clause License. For full text see link: https://github.com/DMTF/Redfish-Interface-Emulator/blob/master/LICENSE.md

# GenZSwitch.py

import g
import sys, traceback
import logging
import copy
from flask import Flask, request, make_response, render_template
from flask_restful import reqparse, Api, Resource
from .templates.GenZSwitch import get_GenZSwitch_instance

members = []
member_ids = []
foo = 'false'
INTERNAL_ERROR = 500

class GenZSwitch(Resource):
	# INIT
	def __init__(self, **kwargs):
		try:
			global config
			global wildcards
			wildcards = kwargs
		except Exception:
			traceback.print_exc()

	# HTTP GET
	def get(self, ident):
		try:
			resp = 404
			for cfg in members:
				#print('id is ' + str(cfg["Id"]))
				if (ident == cfg["Id"]):
					config = cfg
					resp = config, 200
					break
		except Exception:
			traceback.print_exc()
			resp = INTERNAL_ERROR
		return resp

	# HTTP POST
	def post(self, ident):
		try:
			global config
			global wildcards
			wildcards['id'] = ident
			config=get_GenZSwitch_instance(wildcards)
			members.append(config)
			member_ids.append({'@odata.id': config['@odata.id']})
			global foo
			if  (foo == 'false'):
				# TODO - add code for subordinate resources
				foo = 'true'
			resp = config, 200
		except Exception:
			traceback.print_exc()
			resp = INTERNAL_ERROR
		return resp

	# HTTP PATCH
	def patch(self, ident):
		try:
			for cfg in members:
				if (ident == cfg["Id"]):
					break
			config = cfg
			logging.info(config)
			for key, value in raw_dict.items():
				config[key] = value
			resp = config, 200
		except Exception:
			traceback.print_exc()
			resp = INTERNAL_ERROR
		return resp

	# HTTP DELETE
	def delete(self, ident):
		try:
			idx = 0
			for cfg in members:
				if (ident == cfg["Id"]):
					break
				idx += 1
			members.pop(idx)
			member_ids.pop(idx)
			resp = 200
		except Exception:
			traceback.print_exc()
			resp = INTERNAL_ERROR
		return resp


class GenZSwitchCollection(Resource):
	def __init__(self):
		self.rb = g.rest_base
		self.config = {
			'@odata.context': self.rb + '$metadata#GenZSwitchCollection.GenZSwitchCollection',
			'@odata.id': self.rb + 'Fabrics/GenZ/Switches',
			'@odata.type': '#SwitchCollection.SwitchCollection',
			'Name': 'Switch Collection',
			'Links': {}
		}
		self.config['Links']['Members@odata.count'] = len(member_ids)
		self.config['Links']['Members'] = member_ids

	def get(self):
		try:
			resp = self.config, 200
		except Exception:
			traceback.print_exc()
			resp = INTERNAL_ERROR
		return resp

	def post(self):
		try:
			g.api.add_resource(GenZSwitch, '/redfish/v1/Fabrics/GenZ/Switches/<string:ident>')
			resp=self.config,200
		except Exception:
			traceback.print_exc()
			resp = INTERNAL_ERROR
		return resp


class CreateGenZSwitch(Resource):
	def __init__(self, **kwargs):
		logging.info('CreateGenZSwitch init called')
		if 'resource_class_kwargs' in kwargs:
			global wildcards
			wildcards = copy.deepcopy(kwargs['resource_class_kwargs'])
			#print("wildcards are " + str(wildcards))
			logging.debug(wildcards, wildcards.keys())

	def put(self,ident):
		logging.info('CreateGenZSwitch put called')
		#print('genz switch put')
		try:
			global config
			global wildcards
			wildcards['id'] = ident
			config=get_GenZSwitch_instance(wildcards)
			members.append(config)
			member_ids.append({'@odata.id': config['@odata.id']})
			# TODO - add code for subordinate resources
			resp = config, 200
		except Exception:
			traceback.print_exc()
			resp = INTERNAL_ERROR
		logging.info('CreateGenZSwitch init exit')
		#print('genzswitch init exit')
		return resp
