@echo off
set v_params=%*

if defined v_params (
    set v_params=%v_params:\=/% 
)

bash -c "docker_exec phpmd `echo %v_params:"=\"% | sed 's/Y:/\/mnt\/y/i'`"