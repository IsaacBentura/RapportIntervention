# Ajoute l'intent-filter du retour OAuth Google à l'activité principale (exécuté par le workflow).
import sys,re
scheme=sys.argv[1];p='AndroidManifest.xml';s=open(p).read()
filt=f'''
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="{scheme}" />
            </intent-filter>
'''
s=re.sub(r'(<activity[^>]*android:name="\.MainActivity"[^>]*>)',lambda m:m.group(1)+filt,s,count=1)
if 'android:launchMode' not in s: s=s.replace('android:name=".MainActivity"','android:name=".MainActivity" android:launchMode="singleTask"',1)
open(p,'w').write(s);print('intent-filter ajouté pour',scheme)
