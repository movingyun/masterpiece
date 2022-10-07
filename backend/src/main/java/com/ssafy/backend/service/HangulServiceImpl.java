package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.HangulRepository;
import com.ssafy.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class HangulServiceImpl implements HangulService {
    @Autowired
    private HangulRepository hangulRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HangulOwnService hangulOwnService;

    @Transactional
    @Override
    public Hangul findHangulByid(int id) {
        return hangulRepository.findByHangulId(id);
    }

    //유저의 티켓 확인하기
    @Transactional
    @Override
    public boolean checkUserTicket(User user, int drawQuantity){
        //티켓이 적으면
        if(user.getTicketCount()<drawQuantity){
            return false;
        } else return true;
    }


    //자음 랜덤 뽑기
    @Transactional
    @Override
    public List<Hangul> pickRandomConstant(User user, int drawQuantity) {
        Random r = new Random();
        List<Hangul> constantList = new ArrayList<>();
        for (int i = 0; i < drawQuantity; i++) {
            // 자음(1~30) 중 랜덤으로 한장 뽑는다.
            int thisConstantId = r.nextInt(30)+1;

            //id에 해당하는 자음 정보를 리스트에 넣어주기
            Hangul pickedConstant = findHangulByid(thisConstantId);
            constantList.add(pickedConstant);

            //id에 해당하는 자음 user의 보유갯수 올려주기
            int userId = user.getId();
            hangulOwnService.plusUserHangle(userId, thisConstantId);
        }
        return constantList;
    }

    //모음 랜덤 뽑기
    @Transactional
    @Override
    public List<Hangul> pickRandomVowel(User user, int drawQuantity) {
        Random r = new Random();
        List<Hangul> vowelList = new ArrayList<>();
        for (int i = 0; i < drawQuantity; i++) {
            // 모음(31~51) 중 랜덤으로 한장 뽑는다.
            int thisVowelId = r.nextInt(21) + 31;

            //id에 해당하는 모음 정보를 리스트에 넣어주기
            Hangul pickedVowel = findHangulByid(thisVowelId);
            vowelList.add(pickedVowel);

            //id에 해당하는 자음 user의 보유갯수 올려주기
            int userId = user.getId();
            hangulOwnService.plusUserHangle(userId, thisVowelId);
        }
        return vowelList;
    }

    @Override
    public List<Integer> getFirstConsonantList(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Integer> list = new ArrayList<>();
        List<String> firstList = hangulRepository.findAllFirstConsonant();
        System.out.println("==============firstList===============");
        for(String s : firstList) {
            System.out.print(s+" ");
        }
        System.out.println();

        List<Object[]> ownList = hangulRepository.findFirstOwnedByUser(user);
        int i=0, j=0;
        for(; i<firstList.size(); i++){
            if(firstList.get(i).equals(((Hangul)ownList.get(j)[0]).getLetter())) {
                list.add((Integer)ownList.get(j)[1]);
                j++;
            } else {
                list.add(0);
            }
        }
        return list;
    }

    @Override
    public List<Integer> getMiddleVowelList(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }
        List<Integer> list = new ArrayList<>();
        List<String> middleList = hangulRepository.findAllMiddleVowel();
        System.out.println("==============middleList===============");
        for(String s : middleList) {
            System.out.print(s+" ");
        }
        System.out.println();

        List<Object[]> ownList = hangulRepository.findMiddleOwnedByUser(user);
        int i=0, j=0;
        for(; i<middleList.size(); i++){
            if(middleList.get(i).equals(((Hangul)ownList.get(j)[0]).getLetter())) {
                list.add((Integer)ownList.get(j)[1]);
                j++;
            } else {
                list.add(0);
            }
        }
        return list;
    }

    @Override
    public List<Integer> getLastConsonantList(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Integer> list = new ArrayList<>();
        List<String> LastList = hangulRepository.findAllLastConsonant();
        System.out.println("==============LastList===============");
        for(String s : LastList) {
            System.out.print(s+" ");
        }
        System.out.println();

        List<Object[]> ownList = hangulRepository.findLastOwnedByUser(user);
        int i=0, j=0;
        for(; i<LastList.size(); i++){
            if(LastList.get(i).equals(((Hangul)ownList.get(j)[0]).getLetter())) {
                list.add((Integer)ownList.get(j)[1]);
                j++;
            } else {
                list.add(0);
            }
        }
        return list;
    }

    @Override
    public List<Integer> getConsonantList(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Integer> list = new ArrayList<>();
        List<String> consonantList = hangulRepository.findAllConsonant();
        System.out.println("==============consonantList===============");
        for(String s : consonantList) {
            System.out.print(s+" ");
        }
        System.out.println();

        List<Object[]> ownList = hangulRepository.findConsonantsOwnedByUser(user);
        int i=0, j=0;
        for(; i<consonantList.size(); i++){
            if(consonantList.get(i).equals(((Hangul)ownList.get(j)[0]).getLetter())) {
                list.add((Integer)ownList.get(j)[1]);
                j++;
            } else {
                list.add(0);
            }
        }
        int cnt1 = list.get(7), cnt2 = list.get(19), cnt3 = list.get(24);
        list.remove(7);
        list.remove(18);
        list.remove(22);
        list.add(cnt1);
        list.add(cnt2);
        list.add(cnt3);
        return list;
    }

    @Override
    public List<Integer> getConsonantList2(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Integer> list = new ArrayList<>();
        List<String> consonantList = hangulRepository.findAllConsonant();
        System.out.println("==============consonantList===============");
        for(String s : consonantList) {
            System.out.print(s+" ");
        }
        System.out.println();

        List<Object[]> ownList = hangulRepository.findConsonantsOwnedByUser(user);
        int i=0, j=0;
        for(; i<consonantList.size(); i++){
            if(consonantList.get(i).equals(((Hangul)ownList.get(j)[0]).getLetter())) {
                list.add((Integer)ownList.get(j)[1]);
                j++;
            } else {
                list.add(0);
            }
        }
        return list;
    }

    @Override
    public Map<String, Integer> getFirstConsonantMap(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        Map<String, String> firstMap = new HashMap<>();
        int num = 0;
        List<String> firstList = hangulRepository.findAllFirstConsonant();
        System.out.println("==============firstList===============");
        for(String s : firstList) {
            System.out.print(s+" ");
            firstMap.put(s, String.valueOf(num++));
        }

        Map<String, Integer> resMap = new HashMap<>();
        List<Object[]> list = hangulRepository.findFirstOwnedByUser(user);
        int i=0, j=0;
        for(; i<firstList.size(); i++){
            if(firstList.get(i).equals(((Hangul)list.get(j)[0]).getLetter())) {
                resMap.put(firstMap.get(firstList.get(i)), (Integer)list.get(j)[1]);
                j++;
            } else {
                resMap.put(firstMap.get(firstList.get(i)), 0);
            }
        }
        return resMap;
    }

    @Override
    public Map<String, Integer> getMiddleVowelMap(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        Map<String, String> middleMap = new HashMap<>();
        int num = 0;
        List<String> middleList = hangulRepository.findAllMiddleVowel();
        System.out.println("==============middleList===============");
        for(String s : middleList) {
            System.out.print(s+" ");
            middleMap.put(s, String.valueOf(num++));
        }
        System.out.println();

        Map<String, Integer> resMap = new HashMap<>();
        List<Object[]> list = hangulRepository.findMiddleOwnedByUser(user);
        int i=0, j=0;
        for(; i<middleList.size(); i++){
            if(middleList.get(i).equals(((Hangul)list.get(j)[0]).getLetter())) {
                resMap.put(middleMap.get(middleList.get(i)), (Integer)list.get(j)[1]);
                j++;
            } else {
                resMap.put(middleMap.get(middleList.get(i)), 0);
            }
        }
        return resMap;
    }

    @Override
    public Map<String, Integer> getLastConsonantMap(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        Map<String, String> lastMap = new HashMap<>();
        int num = 0;
        List<String> lastList = hangulRepository.findAllLastConsonant();
        System.out.println("==============lastList===============");
        for(String s : lastList) {
            System.out.print(s+" ");
            lastMap.put(s, String.valueOf(num++));
        }
        System.out.println();

        Map<String, Integer> resMap = new HashMap<>();
        List<Object[]> list = hangulRepository.findLastOwnedByUser(user);
        int i=0, j=0;
        for(; i<lastList.size(); i++){
            if(lastList.get(i).equals(((Hangul)list.get(j)[0]).getLetter())) {
                resMap.put(lastMap.get(lastList.get(i)), (Integer)list.get(j)[1]);
                j++;
            } else {
                resMap.put(lastMap.get(lastList.get(i)), 0);
            }
        }
        return resMap;
    }

    @Override
    public Map<String, Integer> getConsonantMap(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        Map<String, String> consonantMap = new HashMap<>();
        int num = 1;
        List<String> consonantList = hangulRepository.findAllConsonant();
        consonantList.remove("ㄸ"); //ㄸ
        consonantList.remove("ㅃ"); //ㅃ
        consonantList.remove("ㅉ"); //ㅉ
        consonantList.add( "ㄸ");
        consonantList.add( "ㅃ");
        consonantList.add( "ㅉ");

        System.out.println("==============consonantList===============");
        for(String s : consonantList) {
            System.out.print(s+" ");
            consonantMap.put(s, String.valueOf(num++));
        }
        System.out.println();

        Map<String, Integer> resMap = new HashMap<>();
        List<Object[]> list = hangulRepository.findConsonantsOwnedByUser(user);
        for(int i=0; i<consonantList.size(); i++){
            for(int j=0; j<list.size(); j++){
                if(consonantList.get(i).equals(((Hangul)list.get(j)[0]).getLetter())){
                    resMap.put(consonantMap.get(consonantList.get(i)), (Integer)list.get(j)[1]);
                    break;
                }
            }
        }

        return resMap;
    }

    @Override
    public List<Hangul> getFirstConsonantsInfo() {
        return hangulRepository.findAllFirstConsonantInfo();
    }

    @Override
    public List<Hangul> getMiddleVowelsInfo() {
        return hangulRepository.findAllMiddleVowelInfo();
    }

    @Override
    public List<Hangul> getLastConsonantsInfo() {
        return hangulRepository.findAllLastConsonantInfo();
    }
}
