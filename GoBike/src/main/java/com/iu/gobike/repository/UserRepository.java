package com.iu.gobike.repository;

import com.iu.gobike.model.User;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;

/**
 * @author jbhushan
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Lock(LockModeType.NONE)
    User findByUserName(String userName);

    @Lock(LockModeType.NONE)
    User findByEmail(String email);

    @Lock(LockModeType.NONE)
    User findByUserNameAndPassword(String userName, String password);

    @Lock(LockModeType.NONE)
    User findByUserNameOrEmailOrPhone(String userName, String email,Long phone);

    @Lock(LockModeType.NONE)
    User findByUserNameOrEmail(String userName, String email);

    @Query("select u.userName from User u where u.userName like ?1%")
    List<String> findAllUsers(String searchStr);

}
