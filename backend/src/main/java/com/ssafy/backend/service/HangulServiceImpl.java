package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.HangulOwn;
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

    @Transactional
    @Override
    public Hangul findHangulByid(int id) {
        return hangulRepository.findByHangulId(id);
    }

    //자음 랜덤 뽑기
    @Transactional
    @Override
    public List<Integer> pickRandomConstant(int drawQuantity) {
        List<Integer> constantIdSet = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < drawQuantity; i++) {
            // 자음(1~30) 중 랜덤으로 한장 뽑는다.
            int thisConstantId = r.nextInt(30)+1;
            constantIdSet.add(thisConstantId);
        }
        return constantIdSet;
    }

    //모음 랜덤 뽑기
    @Transactional
    @Override
    public List<Integer> pickRandomVowel(int drawQuantity) {
        List<Integer> vowelIdSet = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < drawQuantity; i++) {
            // 모음(31~51) 중 랜덤으로 한장 뽑는다.
            int thisVowelId = r.nextInt(21) + 31;
            vowelIdSet.add(thisVowelId);
        }
        return vowelIdSet;
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
        System.out.println("==============consonantList===============");
        for(String s : consonantList) {
            System.out.print(s+" ");
            consonantMap.put(s, String.valueOf(num++));
        }
        System.out.println();

        Map<String, Integer> resMap = new HashMap<>();
        List<Object[]> list = hangulRepository.findConsonantsOwnedByUser(user);
        int i=0, j=0;
        for(; i<consonantList.size(); i++){
            if(consonantList.get(i).equals(((Hangul)list.get(j)[0]).getLetter())) {
                resMap.put(consonantMap.get(consonantList.get(i)), (Integer)list.get(j)[1]);
                j++;
            } else {
                resMap.put(consonantMap.get(consonantList.get(i)), 0);
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
