import requests, os, git, subprocess, sys
from pathlib import Path

URL = 'https://api.jrosk.ch'
ROOT = Path(__file__).resolve().parent
repo = git.Repo(ROOT)

def decode(bin):
	return bin.decode(sys.stdout.encoding)

class Config(object):
	def __init__(self, name, http, auth, vars):
		self.name = name
		self.http = http
		self.auth = auth
		self.vars = vars


class SetConfig(object):
	def __init__(self, config):
		self.conf = config
		self.http = self.set_prop(os.path.join(ROOT, 'src/http.js'))
		self.vars = self.set_prop(os.path.join(ROOT, 'static/sass/_variables.scss'))
		self.auth = self.set_prop(os.path.join(ROOT, 'src/auth.js'))
		self.replace_lines()
		self.write_lines()
	
	def set_prop(self, path):
		with open(path, 'r') as file:
			return {'lines': file.readlines(), 'path': path}
	
	def replace_lines(self):
		self.http['lines'][0] = self.conf.http
		self.vars['lines'][0] = self.conf.vars
		for c, i in enumerate(self.conf.auth):
			self.auth['lines'][c] = i
	
	def write_lines(self):
		print(f"\nSetting config: {self.conf.name}")
		for config in [self.http, self.vars, self.auth]:
			print(f"Writting: {config['path']}")
			with open(config['path'], 'w') as file:
				for line in config['lines']:
					file.write(line)
		print(f"Done: {self.conf.name} is set")


class Build(object):
	def __init__(self, url):
		self.url = url
		self.build()
	
	def build(self):
		self.build_dist()
		self.git_add()
		self.git_commit()
		self.git_push()
		self.send_signal()

	def build_dist(self):
		print('\nStart npm build...')
		output = subprocess.call(['npm', 'run', 'build', '-s'])
		if output:
			print(f'\nBuild: fail')
		else:
			print(f"\nBuild: success")

	def git_add(self):
		print('\nAdd files...')
		a = repo.git.add('.')
		print(a)
			
	def git_commit(self):
		print('\ntry commiting...')
		try:
			c = repo.git.commit('-a', '-m', '"maj dist"')
			print(f'\ncommit: succes\n{c}')
		except Exception as e:
			print(f'\ncommit: error\n{e}')

	def git_push(self):
		print('\nPushing to remote...')
		p = repo.remote().push()[0]
		if '[up to date]' in p.summary:
			print('\nPush fail: nothing to update')
		else:
			print('\nPush success')

	def send_signal(self):
		print('\nSending signal to server...')
		r = requests.get(f'{self.url}/git-pull')
		print('Server response:\n')
		print(r.text)


local = Config(
	name='local',
	http='const url = "http://localhost:8000/";\n',
	vars='@import "themes/generic";\n',
	auth=[
		'const clientID = "3zna8lwrR2rHoWxxwQHEqgRn6dPezrcI";\n',
		'const redirectUri = "http://localhost:8080/callback";\n',
		'const audience = "http://jrosk.ch:8000";\n',
	]
)
staging = Config(
	name='staging',
	http='const url = "https://api.jrosk.ch/";\n',
	vars='@import "themes/generic";\n',
	auth=[
		'const clientID = "3zna8lwrR2rHoWxxwQHEqgRn6dPezrcI";\n',
		'const redirectUri = "https://jrosk.ch/callback";\n',
		'const audience = "http://jrosk.ch:8000";\n',
	]
)



SetConfig(staging)
Build(URL)
SetConfig(local)
