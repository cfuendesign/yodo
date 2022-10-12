save:
	cp yodo.ts backup/yodo.BACKUP.ts
	cp todoDAO.ts backup/todoDAO.BACKUP.ts
	cp README.md backup/README.BACKUP.md

compile:
	deno compile --allow-read --allow-write yodo.ts
	mv yodo bin/
