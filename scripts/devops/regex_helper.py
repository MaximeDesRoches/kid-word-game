import re
import sys

pattern, filepath = sys.argv[1], sys.argv[2]
with open(filepath, 'r') as file:
	for line in file.readlines():
		match = re.search(pattern, line)
		if (match):
			print(match.group('target'))
			break
