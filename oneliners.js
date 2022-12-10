// deno-fmt-ignore-file
// 1.1
Math.max(...document.body.innerText.trim().split("\n\n").map(e=>e.split("\n").map(Number).reduce((a,c)=>a+c)))
// 1.2
document.body.innerText.trim().split("\n\n").map(e=>e.split("\n").map(Number).reduce((a,c)=>a+c)).sort((a,b)=>b-a).slice(0,3).reduce((a,c)=>a+c)
// 2.1
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ")).map(([l,r])=>["ABC".indexOf(l),"XYZ".indexOf(r)]).reduce((a,[l,r])=>a+r+1+(l==r?3:((r+1)%3!=l?6:0)),0)
// 2.2
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ")).map(([l,r])=>[" ABC".indexOf(l)," XYZ".indexOf(r)]).reduce((a,[l,r])=>a+(((l+r)%3)+1)+((r-1)*3),0)
// 3.1
document.body.innerText.trim().split("\n").map(l=>[l.slice(0,l.length/2),l.slice(l.length/2)]).map(([f,s])=>f.split("").find(c=>s.indexOf(c)!=-1)).map(p=>p>="a"&&p<="z"?p.charCodeAt(0)-97+1:p.charCodeAt(0)-65+27).reduce((a,c)=>a+c)
// 3.2
Object.values(document.body.innerText.trim().split("\n").reduce((a,e,i)=>({...a,[Math.floor(i/3)]:(a[Math.floor(i/3)]??[]).concat(e)}),{})).map(([l,m,r])=>l.split("").find(c=>m.indexOf(c)!=-1&&r.indexOf(c)!=-1)).map(p=>p>="a"&&p<="z"?p.charCodeAt(0)-97+1:p.charCodeAt(0)-65+27).reduce((a,c)=>a+c)
// 4.1
document.body.innerText.trim().split("\n").map(l=>l.split(",").map(r=>r.split("-").map(Number))).reduce((a,[f,s])=>a+((f[0]<=s[0]&&f[1]>=s[1])||(s[0]<=f[0]&&s[1]>=f[1])),0)
// 4.2
document.body.innerText.trim().split("\n").map(l=>l.split(",").map(r=>r.split("-").map(Number))).reduce((a,[f,s])=>a+(!(f[1]<s[0])&&!(s[1]<f[0])),0)
// 5.1
document.body.innerText.split("\n\n")[1].trim().split("\n").map(l=>l.match(/\d+/g).map(Number)).reduce((g,[c,f,t])=>g.map((s,i)=>i==t-1?s.reverse().concat(g[f-1].splice(0,c)).reverse():s),document.body.innerText.split("\n\n")[0].split("\n").slice(0,-1).reduce((a,l)=>a.map((c,i)=>l[i*4+1]!=" "?c.concat(l[i*4+1]):c),Array(9).fill().map(()=>[])) ).map(s=>s[0]).join("") 
// 5.2
document.body.innerText.split("\n\n")[1].trim().split("\n").map(l=>l.match(/\d+/g).map(Number)).reduce((g,[c,f,t])=>g.map((s,i)=>i==t-1?s.reverse().concat(g[f-1].splice(0,c).reverse()).reverse():s),document.body.innerText.split("\n\n")[0].split("\n").slice(0,-1).reduce((a,l)=>a.map((c,i)=>l[i*4+1]!=" "?c.concat(l[i*4+1]):c),Array(9).fill().map(()=>[])) ).map(s=>s[0]).join("") 
// 6.1
document.body.innerText.trim().split("").findIndex((_,i,a)=>new Set(a.slice(i,i+4)).size===4)+4
// 6.2
document.body.innerText.trim().split("").findIndex((_,i,a)=>new Set(a.slice(i,i+14)).size===14)+14
// 7.1
Object.values(document.body.innerText.trim().split("\n").slice(1).filter(l=>!l.startsWith("dir")&&!l.startsWith("$ ls")).map(l=>l.startsWith("$")?l.slice(2).split(" "):l.split(" ")).reduce(([cd,dict],l)=>[l[0]=="cd"?(l[1]==".."?cd.slice(0,-1):cd.concat(l[1])):cd,l[0]!=="cd"?cd.reduce((idict,_,i)=>({...idict,[cd.slice(0,i+1).join("/")]:(idict[cd.slice(0,i+1).join("/")]??0)+parseInt(l[0])}),dict):dict],[["root"],{}])[1]).filter(d=>d<=100000).reduce((a,c)=>a+c,0) 
// 7.2
Object.values(document.body.innerText.trim().split("\n").slice(1).filter(l=>!l.startsWith("dir")&&!l.startsWith("$ ls")).map(l=>l.startsWith("$")?l.slice(2).split(" "):l.split(" ")).reduce(([cd,dict],l)=>[l[0]=="cd"?(l[1]==".."?cd.slice(0,-1):cd.concat(l[1])):cd,l[0]!=="cd"?cd.reduce((idict,_,i)=>({...idict,[cd.slice(0,i+1).join("/")]:(idict[cd.slice(0,i+1).join("/")]??0)+parseInt(l[0])}),dict):dict],[["root"],{}])[1]).sort((a,b)=>a-b).find((d,_,a)=>d>=a.at(-1)-(70000000-30000000))
// 8.1
document.body.innerText.trim().split("\n").map(l=>l.trim().split("").map(Number)).reduce((t,r,ri,rs)=>t+r.reduce((a,c,ci)=>a+(Math.min(Math.max(...rs[ri].slice(0,ci)),Math.max(...rs[ri].slice(ci+1)),Math.max(...rs.map(r=>r[ci]).slice(0,ri)),Math.max(...rs.map(r=>r[ci]).slice(ri+1)))<c),0),0)
// 8.2
Math.max(...document.body.innerText.trim().split("\n").map(l=>l.trim().split("").map(Number)).map((r,ri,rs)=>r.map((c,ci)=>[rs[ri].slice(0,ci).reverse(),rs[ri].slice(ci+1),rs.map(r=>r[ci]).slice(0,ri).reverse(),rs.map(r=>r[ci]).slice(ri+1)].reduce((a,s)=>a*(s.findIndex(t=>t>=c)!=-1?s.findIndex(t=>t>=c)+1:s.length),1))).flat())
// 9.1
document.body.innerText.trim().split("\n").map(l=>[l.split(" ")[0],parseInt(l.split(" ")[1])]).reduce(([knots,vis],[dir,cnt])=>Array(cnt).fill().reduce(([ks,vs])=>[ks.reduce((a,[r,c],i)=>a.concat([i?Math.abs(ks[i][1]-a[i-1][1])>1||Math.abs(ks[i][0]-a[i-1][0])>1?[r+(a[i-1][0]==r?0:Math.sign(a[i-1][0]-ks[i][0])),c+(a[i-1][1]==c?0:Math.sign(a[i-1][1]-ks[i][1]))]:[r,c]:[r-("UD".indexOf(dir)!=-1?"U D".indexOf(dir)-1:0),c-("LR".indexOf(dir)!=-1?"L R".indexOf(dir)-1:0)]]),[]),vs.add(ks.at(-1).join(","))],[knots,vis]),[Array(2).fill().map(()=>[0,0]),new Set()]).map((v,i,a)=>i?v.add(a[0].at(-1).join(",")):v)[1].size
// 9.2
document.body.innerText.trim().split("\n").map(l=>[l.split(" ")[0],parseInt(l.split(" ")[1])]).reduce(([knots,vis],[dir,cnt])=>Array(cnt).fill().reduce(([ks,vs])=>[ks.reduce((a,[r,c],i)=>a.concat([i?Math.abs(ks[i][1]-a[i-1][1])>1||Math.abs(ks[i][0]-a[i-1][0])>1?[r+(a[i-1][0]==r?0:Math.sign(a[i-1][0]-ks[i][0])),c+(a[i-1][1]==c?0:Math.sign(a[i-1][1]-ks[i][1]))]:[r,c]:[r-("UD".indexOf(dir)!=-1?"U D".indexOf(dir)-1:0),c-("LR".indexOf(dir)!=-1?"L R".indexOf(dir)-1:0)]]),[]),vs.add(ks.at(-1).join(","))],[knots,vis]),[Array(10).fill().map(()=>[0,0]),new Set()]).map((v,i,a)=>i?v.add(a[0].at(-1).join(",")):v)[1].size
// 10.1
document.body.innerText.trim().split("\n").map(l=>l.split(" ").map((e,i)=>i?parseInt(e):e)).reduce(([x,ans,cyc],[ins,cnt])=>[x+(ins=="addx"?cnt:0),ans+((cyc+1-20)%40==0?(cyc+1)*x:0)+((ins=="addx"&&(cyc+2-20)%40==0)?(cyc+2)*(x+cnt):0),cyc+(ins=="noop"?1:2)],[1,0,1])[1]
// 10.2
Object.values(document.body.innerText.trim().split("\n").map(l=>l.split(" ").map((e,i)=>i?parseInt(e):e)).reduce(([x,cyc,crt],[ins,cnt])=>[x+(ins=="addx"?cnt:0),cyc+(ins=="noop"?1:2),crt.concat([(Math.abs(x-((cyc-1)%40))<=1?"#":" "),ins=="noop"?null:((Math.abs(x-((cyc+1-1)%40))<=1?"#":" "))].filter(Boolean))],[1,1,[]])[2].reduce((g,e,i)=>({...g,[Math.floor(i/40)]:[...(g[Math.floor(i/40)]??[]),e]}),{})).map((l,i)=>(i?" ":"")+l.join("")).join("\n")
