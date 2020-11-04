package utils

import (
	"sync"
)

/*
 Simple interface that allows us to switch out both implementations of the Manager
*/
type ConfigManager interface {
	Set(*Config)
	Get() *Config
	Close()
}

/*
 This struct manages the configuration instance by
 preforming locking around access to the Config struct.
*/
var cm *MutexConfigManager

type MutexConfigManager struct {
	conf  *Config
	mutex *sync.Mutex
}

func NewMutexConfigManager(conf *Config) *MutexConfigManager {
	cm = &MutexConfigManager{conf, &sync.Mutex{}}
	return cm
}

func GetConfigManager() *MutexConfigManager {
	return cm
}

func (m *MutexConfigManager) Set(conf *Config) {
	m.mutex.Lock()
	m.conf = conf
	m.mutex.Unlock()
}

func (m *MutexConfigManager) Get() *Config {
	m.mutex.Lock()
	temp := m.conf
	m.mutex.Unlock()
	return temp
}

func (m *MutexConfigManager) Close() {
	//Do Nothing
}



