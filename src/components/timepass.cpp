#include<bits/stdc++.h>
using namespace std;
#define MOD 1000000007
#define pb push_back
#define vlli vector<long long int>
typedef long long int lli;
typedef unsigned long long int ulli;
#define vvlli vector<vector<lli> >
#define vvp vector<vector<pair<lli,lli> > >


int main(){


    // cout<<"let data = [\n";
    // for(lli block=0;block<4;++block){
    //     for(lli floor=1;floor<=3;floor++){
    //         for(lli room=0;room<=36;room++){
    //             string curr="";
    //             char cc=(char)('A'+block);
    //             curr=cc;
    //             curr+="-";
    //             curr+=to_string(floor*100+room);
    //             cout<<"\""<<curr<<"\""<<", ";
    //         }
    //         cout<<"\n";
    //     }
    // }

    // for(lli floor=1;floor<=4;++floor){
    //     for(lli room=0;room<=24;++room){
    //         string curr="E";
    //         curr+="-";
    //         curr+=to_string(floor*100+room);
    //         cout<<"\""<<curr<<"\"";
    //         if(floor==4 && room==24){
    //             continue;
    //         }
    //         cout<<", ";
    //     }
    //     cout<<"\n";
    // }
    // cout<<"]\n";
    // cout<<"module.exports = {data}\n";


    for(lli block=0;block<4;++block){
        for(lli floor=1;floor<=3;floor++){
            for(lli room=0;room<=36;room++){
                string curr="";
                char cc=(char)('A'+block);
                curr=cc;
                curr+="-";
                curr+=to_string(floor*100+room);
                cout<<"{\n";
                cout<<"\t"<<"\"roomid\":"<<"\""<<curr<<"\""<<",\n";
                if(room==0 || room==1 || room==25 || room==6){
                    cout<<"\t\"total\":2,\n";
                    cout<<"\t\"available\":2\n"; 
                }
                else{
                    cout<<"\t\"total\":1,\n";
                    cout<<"\t\"available\":1\n"; 
                }
                cout<<"},\n";
            }
        }
    }

    for(lli floor=1;floor<=4;++floor){
        for(lli room=0;room<=24;++room){
            string curr="E";
            curr+="-";
            curr+=to_string(floor*100+room);
            cout<<"{\n";
            cout<<"\t"<<"\"roomid\":"<<"\""<<curr<<"\""<<",\n";
            cout<<"\t\"total\":3,\n";
            cout<<"\t\"available\":3\n"; 
            cout<<"}";
            if(floor==4 && room==24)continue;
            cout<<",\n";
        }
    }
    cout<<'\n';
}