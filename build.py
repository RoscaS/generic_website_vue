import requests, os, git, subprocess, sys
from time import sleep
from pathlib import Path

URL = 'https://api.jrosk.ch'
ROOT = Path(__file__).resolve().parent
repo = git.Repo(ROOT)


def build_dist():
	print('\nStart npm build')
	output = subprocess.call(['npm', 'run', 'build', '-s'])
	if output:
		print(f'\nBuild: fail')
	else:
		print(f"\nBuild: success")
		
def commit():
	sleep(1)
	print('\ntry commiting...')
	try:
		c = repo.git.commit('-a', '-m', '"maj dist"')
		print(f'\ncommit: succes\n{c}')
	except Exception as e:
		print(f'\ncommit: error\n{e}')

def push():
	sleep(1)
	print('\nPushing to remote')
	p = repo.remote().push()[0]
	if '[up to date]' in p.summary:
		print('\nPush fail: nothing to update')
	else:
		print('\nPush success')

def send_signal(url):
	sleep(1)
	print('\nSending signal to server')
	r = requests.get(f'{url}/git-pull')
	print('Server response:\n')
	print(r.text)
	

def decode(bin):
	return bin.decode(sys.stdout.encoding)


build_dist()
commit()
push()
send_signal(URL)
